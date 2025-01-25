import ProfilePhoto from "@/app/components/shared/ProfilePhoto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@clerk/nextjs/server";
import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { readFileAsDataURL } from "@/lib/utils";
import Image from "next/image";
import { Images } from "lucide-react";
import { createPostAction } from "@/lib/serveractions";

type PostDialogProps = {
  setOpen: (isOpen: boolean) => void;
  open: boolean;
  src: string;
  user: User | null;
};

export function PostDialog({ setOpen, open, src, user }: PostDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const dataUrl = await readFileAsDataURL(file);
    setSelectedFile(dataUrl);
  };

  const postActionHandler = async (formData: FormData) => {
    const inputText = formData.get("inputText") as string;
    try {
      await createPostAction(inputText, selectedFile);
      setOpen(false);
      setInputText("");
      setSelectedFile("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfilePhoto src={src} />
            <div>
              <h1 className="text-black mt-2">
                {(user?.firstName ?? "") + (user?.lastName ?? "")}
              </h1>
            </div>
          </DialogTitle>
          <DialogDescription>Post to anyone</DialogDescription>
        </DialogHeader>
        <form action={postActionHandler}>
          <div className="flex flex-col gap-4">
            <Textarea
              id="name"
              name="inputText"
              className="border-none text-lg focus-visible:ring-0"
              placeholder="Type your message here."
              onChange={changeHandler}
              value={inputText}
            />
            <div className="my-4">
              {selectedFile && (
                <Image
                  src={selectedFile as string}
                  alt="previewImage"
                  width={400}
                  height={400}
                />
              )}
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button variant={"ghost"} onClick={() => inputRef.current?.click()}>
          <Images className="text-blue-500" />
          <p>Image</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

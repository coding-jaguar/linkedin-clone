"use client";
import { User } from "@clerk/nextjs/server";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Input } from "@/components/ui/input";
import { PostDialog } from "@/components/PostDialog";
import { useState } from "react";

const PostInput = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState<boolean>(false);
  const inputHandler = () => {
    setOpen(true);
  };
  return (
    <div className="bg-white p-4 m-2 md:m-0 border-gray-300 rounded-lg">
      <div className="flex items-center gap-3">
        <ProfilePhoto src={user ? user.imageUrl : "./banner.jpg"} />
        <Input
          type="text"
          placeholder="What's on your mind?"
          className="rounded-full p-4 hover:bg-gray-100 h-12"
          onClick={inputHandler}
        />
        <PostDialog
          setOpen={setOpen}
          open={open}
          src={user ? user.imageUrl : "./banner.jpeg"}
          user={user}
        />
      </div>
    </div>
  );
};
export default PostInput;

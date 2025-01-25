"use client";
import { useUser } from "@clerk/nextjs";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCommentAction } from "@/actions/commentActions";

const CommentInput = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  if (!user) return null;

  const commentActionHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Store a reference to the form before asynchronous actions
    const form = event.currentTarget;

    const formData = new FormData(form); // Collect form data
    try {
      await createCommentAction(postId, formData); // Call your comment action
      form.reset(); // Reset the form
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <form onSubmit={commentActionHandler}>
      <div className="flex items-center gap-2 px-2">
        <ProfilePhoto src={user.imageUrl} />
        <Input
          type="text"
          name="inputText"
          placeholder="Write a comment..."
          className="rounded-full"
        />
        <Button type="submit" variant="outline" className="rounded-full">
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;

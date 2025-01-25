"use server";
import { Comment } from "@/models/comment.model";
import { Post } from "@/models/post.model";
import { User } from "@/models/user.model"; // Ensure you have a User model
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  const currentuser = await currentUser(); // Get the current Clerk user
  if (!currentuser) {
    throw new Error("User not authenticated");
  }

  const inputText = formData.get("inputText") as string;
  if (!inputText) {
    throw new Error("Comment cannot be empty");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Find the User document by userId
  const dbUser = await User.findOne({ userId: currentuser.id });
  if (!dbUser) {
    throw new Error("User not found in the database");
  }

  // Create the comment using the User's `_id`
  const comment = await Comment.create({
    textMessage: inputText,
    user: dbUser._id, // Use the ObjectId `_id` field
  });

  await comment.populate("user");
  await comment.save();

  if (!post.comments) {
    post.comments = [];
  }
  post.comments.push(comment._id); // Add the comment ID to the post
  await post.save();

  revalidatePath("/");
};

import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  try {
    const { postId } = await context.params;

    await connectDB();
    const { userId } = await req.json();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post.likes) {
      post.likes = [];
    }

    // Remove the userId from the likes array
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id: string) => id !== userId);
      await post.save();
    }

    return NextResponse.json({
      likes: post.likes,
      message: "Post disliked successfully",
    });
  } catch (error) {
    console.error("Error processing the dislike request:", error);
    return NextResponse.json(
      { error: "Failed to process dislike. Please try again." },
      { status: 500 }
    );
  }
};

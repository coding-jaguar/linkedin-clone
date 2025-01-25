import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  try {
    await connectDB();

    // Await the params before accessing postId
    const { postId } = context.params;

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    console.error("Error getting post from the database:", error);
    return NextResponse.json(
      { error: "Failed to get post. Please try again." },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  console.log("called post likes");
  try {
    await connectDB();

    // Await the params before accessing postId
    const { postId } = await context.params;

    const { userId } = await req.json();
    const post = await Post.findById({ _id: postId });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post.likes) {
      post.likes = [];
    }

    // Add userId to likes (ensures no duplicates)
    await post.updateOne({ $addToSet: { likes: userId } });
    await post.save();
    revalidatePath("/");

    return NextResponse.json({
      likes: post.likes,
      message: "Post liked successfully",
    });
  } catch (error) {
    console.error("Error getting post from the database:", error);
    return NextResponse.json(
      { error: "Failed to get post. Please try again." },
      { status: 500 }
    );
  }
};

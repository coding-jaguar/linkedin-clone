import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) => {
  try {
    await connectDB();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({
        status: 404,
        body: { message: "Post not found" },
      });
    }
    const comments = await post?.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    return NextResponse.json({
      status: 200,
      comments: post.comments,
    });
  } catch (error) {
    console.log(error);
  }
};

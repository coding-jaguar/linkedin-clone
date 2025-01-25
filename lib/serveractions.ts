"use server";

import { Post } from "@/models/post.model";
import { IUserDocument, User } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  //console.log("Creating post...");

  // Connect to the database
  await connectDB();

  // Get the currently authenticated user from Clerk
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  // Validate input text
  if (!inputText.trim()) {
    throw new Error("Input text is required");
  }

  // Find or create the user in the database
  let dbUser = await User.findOne({ userId: user.id });

  if (!dbUser) {
    //console.log("User not found in the database. Creating a new user...");
    dbUser = await User.create({
      firstName: user.firstName || "Anonymous",
      lastName: user.lastName || "",
      userId: user.id,
      profilePicture:
        user.imageUrl ||
        "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
    });
    //console.log("New user created:", dbUser);
  } else {
    //console.log("User found in the database:", dbUser);
  }

  let imageUrl = null;

  // Upload the image to Cloudinary if provided
  if (selectedFile) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(selectedFile);
      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      console.error("Failed to upload image to Cloudinary:", error);
      throw new Error("Failed to upload image. Please try again.");
    }
  }

  // Create a new post
  try {
    const newPost = await Post.create({
      description: inputText,
      user: dbUser._id, // Reference the User's ObjectId
      imageUrl,
    });

    //console.log("Post created successfully:", newPost);
    revalidatePath("/");
    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    console.error("Error creating post in the database:", error);
    throw new Error("Failed to create post. Please try again.");
  }
};

export const getAllPostsAction = async () => {
  await connectDB();

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("user") // Populate the user of the post
      .populate({
        path: "comments", // Populate the comments array in the post
        populate: {
          path: "user", // Populate the user inside each comment
          model: "User", // Specify the User model
        },
      });
    //console.log("Posts found:", posts);
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error getting posts from the database:", error);
    throw new Error("Failed to get posts. Please try again.");
  }
};

export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const post = await Post.findById(postId).populate<{ user: IUserDocument }>(
    "user"
  );
  if (!post) {
    throw new Error("Post not found" + postId);
  }
  if (post.user.userId !== user.id) {
    throw new Error("Unauthorized " + user.id + " " + post.user.userId);
  }
  await post.deleteOne();
  revalidatePath("/");
};

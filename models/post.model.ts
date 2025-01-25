import mongoose, { Model, Document } from "mongoose";
import { IUserDocument } from "./user.model";
import { ICommentDocument } from "./comment.model";

export interface IPost {
  description: string;
  user: IUserDocument["_id"]; // Reference to User model
  imageUrl?: string;
  likes?: string[];
  comments?: ICommentDocument["_id"][]; // Reference to Comment model
}

export interface IPostDocument extends IPost, Document {
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    imageUrl: {
      type: String,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment", // Reference to Comment model
      default: [], // Default to an empty array
    },
  },
  { timestamps: true }
);

// Check for existing model before defining it
export const Post: Model<IPostDocument> =
  mongoose.models.Post || mongoose.model<IPostDocument>("Post", postSchema);

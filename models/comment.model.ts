import mongoose, { Document, Model } from "mongoose";
import { IUserDocument } from "./user.model";

export interface IComment {
  textMessage: string;
  user: IUserDocument["_id"] | IUserDocument; // Reference to User model
}

export interface ICommentDocument extends IComment, Document {
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema<ICommentDocument>(
  {
    textMessage: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
);

// Check for existing model before defining it
export const Comment: Model<ICommentDocument> =
  mongoose.models.Comment ||
  mongoose.model<ICommentDocument>("Comment", commentSchema);

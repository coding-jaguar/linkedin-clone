import { Button } from "@/components/ui/button";
import { IPostDocument } from "@/models/post.model";
import { IUserDocument } from "@/models/user.model";
import { useUser } from "@clerk/nextjs";
import { MessageCircleHeart, Repeat, Send, ThumbsUp } from "lucide-react";
import { use, useEffect, useState } from "react";
import Comments from "./Comments";
import CommentsInput from "./CommentInput";
import { ICommentDocument } from "@/models/comment.model";

export const Divider = () => (
  <div className="flex justify-center">
    <div className="w-full h-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-25"></div>
  </div>
);

const SocialOptions = ({
  post,
}: {
  post: IPostDocument & {
    comments: ICommentDocument & { user: IUserDocument };
  } & {
    user: IUserDocument;
  };
}) => {
  const { user } = useUser();
  const [commentOpen, setCommentOpen] = useState(true);
  const [liked, setLiked] = useState(() =>
    (post.likes ?? []).includes(user?.id ?? "")
  );
  const [likes, setLikes] = useState(post.likes || []);

  const LikeOrDislikeHandler = async () => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const tempLiked = liked;
    const tempLikes = likes;

    // Optimistic state update
    const updatedLikes = liked
      ? likes.filter((userId) => userId !== user.id)
      : [...likes, user.id];

    setLiked(!liked);
    setLikes(updatedLikes);

    try {
      const response = await fetch(
        `/api/posts/${post._id}/${liked ? "dislike" : "like"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like or dislike post");
      }
    } catch (error) {
      // Revert state in case of an error
      setLiked(tempLiked);
      setLikes(tempLikes);
      console.error(error);
    }
  };

  const className =
    "cursor-pointer bg-white text-black shadow-none hover:bg-blue-100 w-full flex justify-center min-h-full font-extrabold rounded-none";

  return (
    <div>
      <Divider />
      <div>
        {likes.length > 0 && (
          <p className="text-xs text-gray-500 hover:text-blue-500 hover:underline cursor-pointer mx-2 p-2 flex items-center justify-start border-gray-300">
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </p>
        )}
        {post.comments && post.comments.length > 0 && (
          <p className="text-xs text-gray-500 hover:text-blue-500 hover:underline cursor-pointer mx-2 p-2 flex items-center justify-start border-gray-300">
            {post.comments.length}{" "}
            {post.comments.length === 1 ? "comment" : "comments"}
          </p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Button className={className} onClick={LikeOrDislikeHandler}>
          <ThumbsUp className={`${liked ? "fill-blue-500" : ""}`} />
        </Button>
        <Button
          onClick={() => setCommentOpen(!commentOpen)}
          className={className}
        >
          <MessageCircleHeart />
        </Button>
        <Button className={className}>
          <Repeat />
        </Button>
        <Button className={className}>
          <Send />
        </Button>
      </div>
      {commentOpen && (
        <div>
          <CommentsInput postId={post._id as string} />
          <Comments post={post} />
        </div>
      )}
    </div>
  );
};

export default SocialOptions;

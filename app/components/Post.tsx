"use client";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SocialOptions from "./SocialOptions";
import PostContent from "./PostContent";
import { IPostDocument } from "@/models/post.model";
import { IUserDocument } from "@/models/user.model";
import { deletePostAction } from "@/lib/serveractions";
import { useUser } from "@clerk/nextjs";
import { ICommentDocument } from "@/models/comment.model";
type PostProps = {
  post: IPostDocument & {
    comments: ICommentDocument & { user: IUserDocument };
  } & {
    user: IUserDocument;
  };
};

const Post = ({ post }: PostProps) => {
  const { description, user } = post;
  const { user: authUser } = useUser();

  const fullname = `${user.firstName} ${user.lastName}`;
  if (!authUser) {
    return <></>;
  }
  console.log(
    "is user authenticated: ",
    post.user?.userId === authUser.id,
    authUser.id,
    post.user?.userId
  );

  return (
    <div className="bg-white my-2 rounded-lg">
      <div className="flex gap-2 p-4">
        <ProfilePhoto
          src={
            post.user?.profilePicture ||
            "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
          }
        />
        <div className="flex items-center justify-between w-full">
          <div className="ml-2">
            <h1 className="text-sm font-bold">
              {fullname}{" "}
              {post.user.userId === authUser.id && (
                <Badge variant={"outline"} className="bg-blue-300 text-white">
                  You
                </Badge>
              )}
            </h1>
            <p className="text-xs text-gray-500">
              {user ? user?.username || "user" : "@user"}
            </p>
            <p className="text-xs text-gray-500">1hr ago</p>
          </div>
        </div>
        <div>
          {post.user?.userId === authUser.id && (
            <Button
              className={`rounded-full flex items-center`}
              size={"icon"}
              variant={"outline"}
              onClick={() => {
                deletePostAction(post._id as string);
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>
      <PostContent description={description} imageUrl={post.imageUrl} />
      <SocialOptions post={post} key={post._id as string} />
    </div>
  );
};
export default Post;

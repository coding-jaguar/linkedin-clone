import { getAllPostsAction } from "@/lib/serveractions";
import Post from "./Post";
import { IPostDocument } from "@/models/post.model";
import { IUser, IUserDocument } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import UnAuthFeed from "./UnAuthFeed";
import { ICommentDocument } from "@/models/comment.model";

type PostWithUser = IPostDocument & {
  comments: ICommentDocument & { user: IUserDocument };
} & { user: IUserDocument };

const Posts = async () => {
  const posts: IPostDocument[] = await getAllPostsAction();

  const user = await currentUser();
  if (!user) return <UnAuthFeed />;

  return (
    <div className="md:mx-0 mx-2">
      {posts.map((post) => (
        <Post
          post={{ ...post, user: post.user as IUser } as PostWithUser}
          key={post.id}
        />
      ))}
    </div>
  );
};
export default Posts;

import { User } from "@clerk/nextjs/server";
import PostInput from "./PostInput";
import Posts from "./Posts";

const Feed = ({ user }: { user: User | null }) => {
  const userData = JSON.parse(JSON.stringify(user));
  return (
    <div className=" md:w-[50%] flex-1 md:flex-none">
      <PostInput user={userData} />
      <Posts />
    </div>
  );
};
export default Feed;

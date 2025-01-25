import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import ProfilePhoto from "./shared/ProfilePhoto";
import { getAllPostsAction } from "@/lib/serveractions";

const Sidebar = async ({ user }: { user: User | null }) => {
  const posts = await getAllPostsAction();

  return (
    <div
      className="hidden md:block w-[25%] h-fit border-gray-300 bg-white
  rounded"
    >
      <div className="flex-col relative items-center border border-gray-300">
        <div className="w-full h-16 overflow-hidden">
          {user && (
            <Image
              src={"/banner.jpeg"}
              height={200}
              width={200}
              alt="user profile"
              className="w-full h-full rounded-t"
            />
          )}
        </div>
        <div className="my-1 absolute top-10 w-full flex justify-center">
          <ProfilePhoto src={user ? user.imageUrl : "./banner.jpg"} />
        </div>
        <div className="border-b border-b-gray-300">
          <div className="p-2 mt-5 text-center">
            <h1 className="font-bold hover:cursor-pointer">
              {user ? user.firstName + " " + user.lastName : "Guest"}
            </h1>
            <p className="text-xs">{user ? user.username : "@username"}</p>
          </div>
        </div>
        <div className="text-xs">
          <div className="w-full flex justify-between items-center p-3 py-2 hover:bg-gray-200 cursor-pointer">
            <p>Post Impression</p>
            <p className="text-blue-500 font-bold">
              {posts.reduce(
                (acc: any, post: any) => acc + post.likes.length,
                0
              )}
            </p>
          </div>
          <div className="w-full flex justify-between items-center p-3 py-2 hover:bg-gray-200 cursor-pointer">
            <p>Post</p>
            <p className="text-blue-500 font-bold">{posts.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

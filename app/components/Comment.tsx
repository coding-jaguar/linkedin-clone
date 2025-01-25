import { ICommentDocument } from "@/models/comment.model";
import { IUserDocument } from "@/models/user.model";
import ProfilePhoto from "./shared/ProfilePhoto";
import ReactTimeago from "react-timeago";

const Comment = ({ comment }: { comment: ICommentDocument }) => {
  // Check if user is populated
  const user: IUserDocument = comment.user as IUserDocument;
  if (!user) {
    return null;
  }

  return (
    <div className="flex m-4 px-2">
      <div className="mt-2">
        <ProfilePhoto src={user.profilePicture as string} />
      </div>
      <div className="flex-1 justify-between p-3 bg-gray-[#F2F2F2] rounded-lg">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h1 className="font-bold">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-xs text-gray-500">{user.username}</p>
          <p className="my-2">{comment.textMessage}</p>
          <div></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          <ReactTimeago date={new Date(comment.createdAt)} />
        </p>
      </div>
    </div>
  );
};

export default Comment;

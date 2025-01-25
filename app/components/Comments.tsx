import { IPostDocument } from "@/models/post.model";
import Comment from "./Comment";
import { ICommentDocument } from "@/models/comment.model";
import { IUserDocument } from "@/models/user.model";

const Comments = ({
  post,
}: {
  post: IPostDocument & {
    comments: ICommentDocument & { user: IUserDocument };
  } & {
    user: IUserDocument;
  };
}) => {
  console.log("comments: ", post.comments);

  return (
    <div>
      {(post.comments as ICommentDocument[]).map(
        (comment: ICommentDocument, idx: number) => (
          <Comment key={idx} comment={comment as ICommentDocument} />
        )
      )}
    </div>
  );
};
export default Comments;

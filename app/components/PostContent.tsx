import Image from "next/image";

type PostContentProps = {
  description: string;
  imageUrl?: string;
};

export const Divider = () => (
  <div className="flex justify-center">
    <div className="w-full h-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-25"></div>
  </div>
);

const PostContent = ({ description, imageUrl }: PostContentProps) => {
  return (
    <div className="my-3">
      <Divider />
      <p className="my-3 px-4">{description}</p>
      {imageUrl && (
        <div className="my-1 flex justify-center h-100">
          <Image
            src={imageUrl}
            alt="post"
            className="p-4"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};
export default PostContent;

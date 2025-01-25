import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ProfilePhoto = ({ src }: { src: string }) => {
  return (
    <div className="cursor-pointer">
      <Avatar>
        <AvatarImage src={src} alt="@shadcn" />
      </Avatar>
    </div>
  );
};
export default ProfilePhoto;

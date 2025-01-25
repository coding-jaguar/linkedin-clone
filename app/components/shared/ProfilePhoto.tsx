import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

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

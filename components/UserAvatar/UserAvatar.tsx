import { useUser } from "@/context/UserContext";
import "./userAvatar.css";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type UserAvatarProps = {
    className?: string;
};

const UserAvatar = ({ className }: UserAvatarProps) => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  if (!className) {
    className = "w-20 h-20 mx-auto mb-4";
  }

  return (
    <div>
      <Avatar className={className}>
        <AvatarImage
          src={user.photoURL || "https://picsum.photos/80"}
          alt={user.displayName || "User"}
        />

        <AvatarFallback>
          {user.displayName
            ? user.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
            : "MP"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;

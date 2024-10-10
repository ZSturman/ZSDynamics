import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserMetricsDisplay from "../UserMetrics/UserMetricsDisplay";

type CommunityCard = {
  communityMember: KnownCommunityMember;
};

const CommunityCard = ({ communityMember }: CommunityCard) => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-start gap-4 space-y-0 pb-2">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={communityMember.photoURL || "https://picsum.photos/80"}
            alt={communityMember.displayName || "User"}
          />

          <AvatarFallback>
            {communityMember.displayName
              ? communityMember.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "MP"}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{communityMember.displayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <UserMetricsDisplay userMetrics={communityMember.userMetrics} />
      </CardContent>
    </Card>
  );
};

export default CommunityCard;

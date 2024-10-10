"use client";
import { useUser } from "@/context/UserContext";
import CommunityCard from "../CommunityCard/CommunityCard";

const CommunityMemberCards = () => {
  const { communityMembers } = useUser();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {communityMembers.map((member) => (
        <CommunityCard communityMember={member} key={member.uid} />
      ))}
    </div>
  );
};

export default CommunityMemberCards;

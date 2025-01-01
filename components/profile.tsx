import Image from "next/image";
import profile from "@/public/images/profile.jpg";

export const Profile = () => {
  return (
    <Image src={profile} alt="" fill className="rounded-lg object-cover" />
  );
};

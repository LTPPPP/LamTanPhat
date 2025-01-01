import Image from "next/image";

export const AboutMe = () => {
  return (
    <Image
      src={"/images/about-me.png"}
      alt=""
      fill
      className="rounded-lg object-cover"
    />
  );
};

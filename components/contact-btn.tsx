import Image from "next/image";
import Link from "next/link";

export const ContactBtn = () => {
  return (
    <>
      <Image src={"/images/bochi.gif"} alt="" fill className="object-cover" unoptimized />
      <Link
        href="mailto:lamphat.job@gmail.com"
        className="z-[0] self-end justify-self-center font-bold text-dark-green hover:text-black hover:underline"
      >
        Hire me pls
      </Link>
    </>
  );
};

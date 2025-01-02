import githubIcon from "../public/icons/gitHub.png";
import facebookIcon from "../public/icons/facebook.png";
import linkedInIcon from "../public/icons/linkedIn.png";
import instagramIcon from "../public/icons/instagram.png";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    name: "Github",
    icon: githubIcon,
    href: "https://github.com/LTPPPP",
  },
  {
    name: "Facebook",
    icon: facebookIcon,
    href: "https://www.facebook.com/profile.php?id=100041724977557",
  },
  {
    name: "LinkedIn",
    icon: linkedInIcon,
    href: "https://www.linkedin.com/in/l%C3%A2m-t%E1%BA%A5n-ph%C3%A1t-36822524a/",
  },
  {
    name: "Instagram",
    icon: instagramIcon,
    href: "https://www.instagram.com/phatlam811/",
  },
];

export const Socials = () => {
  return (
    <ul className="flex items-center justify-around">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            target="_blank"
            className="block rounded-full bg-yellow p-2 hover:cursor-pointer hover:bg-white"
          >
            <Image src={item.icon} alt={item.name} className="w-6" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

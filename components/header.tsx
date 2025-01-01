"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "motion/react";

const Header = ({
  className,
  ref,
}: {
  className?: string;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <header
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-between rounded-lg px-5 py-2 opacity-0 lg:flex-row",
        className,
      )}
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
      }}
    >
      <Link href="/">
        <Image
          src={"/images/logo.png"}
          className="w-10"
          alt=""
          width={66}
          height={56}
        />
      </Link>
      <ul className="flex items-center justify-center gap-3 text-xs md:text-sm lg:gap-6">
        <li>
          <Button asChild variant={"link"} className="p-0 text-white">
            <Link
              href="https://github.com/LTPPPP?tab=repositories"
              target="_blank"
            >
              All my public projects
            </Link>
          </Button>
        </li>
      </ul>
    </header>
  );
};

export const MotionHeader = motion.create(Header);

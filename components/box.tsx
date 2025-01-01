"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const Box = ({
  className,
  ref,
  children,
}: {
  className?: string;
  ref: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}) => {
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-lg p-5 opacity-0", className)}
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};

export const MotionBox = motion.create(Box);

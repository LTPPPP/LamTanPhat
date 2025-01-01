"use client";

import { motion } from "motion/react";

const GridLayout = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      className="relative mx-auto grid min-h-screen max-w-screen-xl gap-2 p-5 lg:grid-cols-12 lg:grid-rows-12"
    >
      {children}
    </div>
  );
};

export const MotionGridLayout = motion.create(GridLayout);

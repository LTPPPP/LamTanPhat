"use client";
import { useState } from "react";
import { motion } from "motion/react";

import { MotionGridLayout } from "@/components/grid-layout";
import { MotionBox } from "@/components/box";
import { MotionHeader } from "@/components/header";

import { Projects } from "@/components/projects";
import { Details } from "@/components/details";
import { Socials } from "@/components/socials";
import { Profile } from "@/components/profile";
import { Skills } from "@/components/skills";
import { ContactBtn } from "@/components/contact-btn";

import { transition } from "@/lib/transition";
import { AnimatePresence } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconCloudMain } from "@/components/icon-cloud";

import {
  item,
  slideDown,
  slideToLeft,
  slideToRight,
  variants,
} from "@/lib/animations";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mobile = useIsMobile();

  return (
    <AnimatePresence mode="wait">
      <MotionGridLayout
        variants={variants}
        animate={isLoading ? (mobile ? "animate" : "initial") : "animate"}
        transition={transition}
      >
        <MotionHeader
          variants={slideDown}
          transition={transition}
          className="lg:col-span-full"
        />

        {!mobile && (
          <motion.h1
            className="absolute text-5xl"
            initial={{
              opacity: 1,
              x: 700,
              y: 400,
            }}
            animate={{
              opacity: 0,
              x: 800,
            }}
            transition={{ ...transition, delay: 0.75 }}
          >
            Lam Tan Phat
          </motion.h1>
        )}
        {!mobile && (
          <MotionBox
            initial={{
              opacity: 1,
              x: 300,
              y: 200,
              scale: 1.2,
            }}
            animate={{
              opacity: 1,
              x: [300, 300, 0],
              y: [200, 0, 0],
              scale: [1.1, 1.1, 1],
            }}
            transition={{ ...transition, duration: 2, delay: 1.25 }}
            onAnimationComplete={() => setIsLoading(false)}
            className="relative min-h-[300px] lg:col-span-3 lg:col-start-1 lg:row-span-5 lg:row-start-2"
          >
            <Profile />
          </MotionBox>
        )}
        <MotionBox
          variants={slideToRight}
          transition={transition}
          className="grid lg:col-span-5 lg:col-start-4 lg:row-start-2 lg:row-end-2 lg:py-0"
        >
          <Socials />
        </MotionBox>
        <MotionBox
          variants={slideToRight}
          transition={transition}
          className="flex flex-col justify-center gap-7 text-center lg:col-span-5 lg:col-start-4 lg:row-start-3 lg:row-end-7"
        >
          <Details />
        </MotionBox>
        <MotionBox
          variants={slideToLeft}
          transition={transition}
          className="relative min-h-[400px] lg:col-start-9 lg:-col-end-1 lg:row-start-2 lg:row-end-9"
        >
          <div className="flex justify-center">
            <h1>Tech stack</h1>
          </div>
          <IconCloudMain />
        </MotionBox>
        <MotionBox
          variants={slideToRight}
          transition={transition}
          className="lg:col-span-6 lg:col-start-1 lg:row-start-7 lg:-row-end-1"
        >
          <Projects />
        </MotionBox>
        <MotionBox
          variants={item}
          transition={{ ...transition, delay: 0.25 }}
          className="relative grid lg:col-span-2 lg:col-start-7 lg:row-start-7 lg:row-end-9"
        >
          <ContactBtn />
        </MotionBox>
        <MotionBox
          variants={slideToLeft}
          transition={transition}
          className="lg:col-start-7 lg:-col-end-1 lg:row-start-9 lg:-row-end-1"
        >
          <Skills />
        </MotionBox>
      </MotionGridLayout>
    </AnimatePresence>
  );
}

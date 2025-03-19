"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const items = [
  {
    name: "Generate image from basic text",
    technologies: [
      "AI",
      "TypeScript",
      "Google Cloud Platform",
      "GeminiAI",
    ],
    preview: "/projects/genimg.png",
    github: "https://github.com/LTPPPP/Generate-Image",
    website: "https://ltpppp-genimg.vercel.app/"
  },
  {
    name: "Sign Language Recognition for everyone - MuteAnt",
    technologies: [
      "Spring Boot",
      "Next.js",
      "PostgreSQL",
      "Google Cloud Platform",
      "TensorFlow",
      "Python",
      "RestAPI",
      "TensorFlow.js",
    ],
    preview: "/projects/mute-ant.png",
    github: "null",
    website: "https://mute-ant.vercel.app/",
  },
  {
    name: "AI-Integrated Autism Support Website - Donald",
    technologies: [
      "Python",
      "Django",
      "JavaScript",
      "MySQL",
      "WebSockets",
      "Google Cloud Platform",
      "GeminiAI",
    ],
    preview: "/projects/donald.png",
    github: "https://github.com/LTPPPP/Donald",
    website: null,
  },
  {
    name: "BrainStormEra - Course learning platform integration AI",
    technologies: [
      ".NET",
      "JavaScript",
      "Bootstrap",
      "MySQL",
      "Google Cloud Platform",
    ],
    preview: "/projects/brainstormera.png",
    github: "https://github.com/LTPPPP/BrainStormEra",
    website: null,
  },
  {
    name: "A typing game can customize your own text",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
    ],
    preview: "/projects/typetype.png",
    github: "https://github.com/LTPPPP/TypeType",
    website: "https://typetype-hazel.vercel.app/"
  },
  {
    name: "SandBox game",
    technologies: ["JavaScript", "CSS", "Framer Motion"],
    preview: "/projects/sandbox.png",
    github: "https://github.com/LTPPPP/Sandbox",
    website: "https://sandbox-coral.vercel.app/",
  },
];

export const Projects = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleLiveClick = (website: string | null) => {
    if (!website) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Carousel>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.name}>
              <div className="relative mb-2 h-[250px]">
                <Image
                  src={item.preview}
                  alt={item.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-wrap text-center font-bold md:text-lg">
                {item.name}
              </p>
              <ul className="mt-2 hidden flex-wrap justify-center gap-2 md:flex">
                {item.technologies.map((tech) => (
                  <li key={tech} className="w-fit rounded-lg bg-grey p-1 text-xs">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <Button
                  asChild
                  variant="default"
                  onClick={() => handleLiveClick(item.website)}
                >
                  {item.website ? (
                    <Link href={item.website} target="_blank">
                      Live
                    </Link>
                  ) : (
                    <span>Live</span>
                  )}
                </Button>
                <Button asChild variant="secondary">
                  <Link href={item.github} target="_blank">
                    Github
                  </Link>
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-black text-white" />
        <CarouselNext className="right-0 bg-black text-white" />
      </Carousel>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4 text-lg font-semibold text-red-500">The project is private now, sorry!</p>
            <button
              onClick={closePopup}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

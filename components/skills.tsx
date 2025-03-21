"use client";
import { ExternalLink } from "lucide-react";

interface Skill {
  title: string;
  items: (string | { label: string; link?: string; details?: string })[];
}

const skills: Skill[] = [
  {
    title: "Achievements",
    items: [
      "Top 14 Hackathon nationwide",
      "Top 2 Code Race 2024",
      "Top 3 Code Work 2023",
      "Research Festival - ResFes 2023",
    ],
  },
  {
    title: "Certificates",
    items: [
      { label: "Software Development Lifecycle", link: "https://coursera.org/share/d6cc6a537c5097d71942d999559a4d54" },
      { label: "Blockchain", link: "https://coursera.org/share/85e71a88061b514ff5c8a9cef5f15737" },
      { label: "Ethics of Artificial Intelligence", link: "https://coursera.org/share/544d394916100593c888a644423245da" },
      { label: "Web Design for Everybody", link: "https://coursera.org/share/abe6a5e2be1ab3d739645623bd0cbdf7" },
      { label: "Introduction to Git and GitHub", link: "https://coursera.org/share/93d66bd494b2ca5242a5f2a5fbe90c07" },
      { label: "...", link: "https://www.linkedin.com/in/ltpppp/details/certifications/" },
    ],
  },
  {
    title: "Work experience",
    items: [
      { label: "UTA Solution", link: "https://www.linkedin.com/company/uta-solution/", details: "8 months" },
      { label: "Freelancer - Outsource", details: "20+ outsource projects" },
    ]
  },
];

export const Skills = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      {skills.map((skill) => (
        <div key={skill.title}>
          <p className="text-center text-sm font-bold">{skill.title}</p>
          <ul className="mt-1 flex flex-wrap justify-center gap-2 text-xs">
            {skill.items.map((item) =>
              typeof item === "string" ? (
                <li key={`${skill.title}-${item}`} className="rounded-lg bg-yellow p-1 text-black">
                  {item}
                </li>
              ) : (
                <li key={`${skill.title}-${item.label}`} className="rounded-lg bg-yellow p-1 text-black flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    {item.label}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="text-black" />
                      </a>
                    )}
                  </div>
                  {item.details && <p className="text-xs text-gray-700">{item.details}</p>}
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};
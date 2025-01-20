import { useEffect, useState } from "react";

interface Skill {
  title: string;
  items: (string | { label: string; value: number })[];
}

const skills: Skill[] = [
  {
    title: "Languages",
    items: ["C++", "Java", "C#", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TailwindCSS", "Ant Design", "Bootstrap"],
  },
  {
    title: "Backend",
    items: ["Spring Boot", "Node.js", ".NET", "MongoDB", "SQL", "Django"],
  },
  {
    title: "Tools",
    items: ["Git", "VSCode", "Figma", "Docker", "Google Cloud Platform"],
  },
  {
    title: "Experience",
    items: [
      { label: "Lines of Code", value: 100000 },
      { label: "Projects", value: 82 },
      { label: "Papers", value: 2 },
      { label: "Achievements", value: 10 },
    ],
  },
];

export const Skills = () => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters) => {
        const updatedCounters = { ...prevCounters };
        const experience = skills.find((skill) => skill.title === "Experience");

        experience?.items.forEach((item) => {
          if (typeof item === "object" && item.label) {
            if (!updatedCounters[item.label]) updatedCounters[item.label] = 0;
            if (updatedCounters[item.label] < item.value) {
              updatedCounters[item.label] += 100;
              if (updatedCounters[item.label] > item.value) {
                updatedCounters[item.label] = item.value;
              }
            }
          }
        });

        return updatedCounters;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3">
        {skills.map((skill) => (
          <div key={skill.title}>
            <p className="text-center text-sm font-bold">{skill.title}</p>
            {skill.title === "Experience" ? (
              <ul className="mt-1 flex gap-1 text-xs">
                {skill.items.map((item) =>
                  typeof item === "object" ? (
                    <li key={item.label} className="text-center pr-5">
                      {item.label}:{" "}
                      <span className="font-bold flex flex-col text-yellow-600">
                        {counters[item.label] || 0}+
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            ) : (
              <ul className="mt-1 flex flex-wrap justify-center gap-2 text-xs">
                {skill.items.map((item) =>
                  typeof item === "string" ? (
                    <li
                      key={`${skill.title}-${item}`}
                      className="rounded-lg bg-yellow p-1 text-black"
                    >
                      {item}
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

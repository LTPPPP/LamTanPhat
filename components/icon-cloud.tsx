import { IconCloud } from "./magicui/icon-cloud";

const slugs = [
    "typescript",
    "javascript",
    "java",
    "react",
    "android",
    "html5",
    "css3",
    "amazonaws",
    "postgresql",
    "nginx",
    "vercel",
    "docker",
    "git",
    "github",
    "gitlab",
    "visualstudiocode",
    "figma",
    "springboot",
    "c#",
    "python",
    "c++",
    "googlecloud",
    "mongodb",
    "solidity",
    "ethereum"
];

export function IconCloudMain() {
    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
    );

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={images} />
        </div>
    );
}

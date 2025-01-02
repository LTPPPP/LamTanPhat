import React from "react";

export const Details = () => {
  const quotes = [
    "Break things, learn from them, build better.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "Experience is the name everyone gives to their mistakes.",
    "In order to be irreplaceable, one must always be different.",
    "Knowledge is power. Sharing it is the key to success.",
    "A people without the knowledge of their past history, origin and culture is like a tree without roots.",
    "Real knowledge is to know the extent of one's ignorance.",
    "The only true wisdom is in knowing you know nothing.",
    "The only source of knowledge is experience.",
    "The only way to do great work is to love what you do.",
    "The only way to learn a new programming language is by writing programs in it.",
    "No man's knowledge here can go beyond his experience."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <>
      <h1 className="relative mx-auto w-fit text-xl font-bold lg:text-3xl">
        Hey! I&apos;m Lam Tan Phat{" "}
        <svg
          width="131"
          height="23"
          viewBox="0 0 131 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-5"
        >
          <path
            d="M3 7.60211C16.0028 5.19607 54.5875 1.1058 104.904 3.99305"
            stroke="#181C14"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M31.1834 14.651C40.4247 11.9286 68.0805 6.01574 104.773 4.14367"
            stroke="#181C14"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M31.4893 14.6014C43.9904 13.285 80.8591 12.2742 128.324 18.7615"
            stroke="#181C14"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </h1>
      <p className="font-bold italic">
        A Frontend, Backend Developer in Vietnam
        <br />
        <span className="font-normal not-italic text-slate-300">
          Specializing in creating seamless and engaging web applications with a focus on performance and user experience. And is moving towards AI.
        </span>
      </p>
      <p>- &ldquo;{randomQuote}&rdquo; </p>
    </>
  );
};

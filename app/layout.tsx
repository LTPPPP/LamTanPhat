import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";

const animeAce = localFont({
  src: [
    {
      path: "./fonts/animeace2_reg.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/animeace2_ital.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/animeace2_bld.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lamtanphat.vercel.app"),
  title: "Lam Tan Phat",
  description:
    "Lam Tan Phat is a Frontend and Backend developer base in VietNam. He specializes in building web applications using modern technologies. He is passionate about building products that make a difference. In the future he wants to move towards Blockchain and AI.",
  icons: {
    icon: ['/favicon.ico?v=4']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="66x56" />
      </Head>
      <body
        className={`${animeAce.className} bg-dark-green text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

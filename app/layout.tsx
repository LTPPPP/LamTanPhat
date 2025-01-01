import type { Metadata } from "next";
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
  metadataBase: new URL("https://LamTanPhat.vercel.app"),
  title: "Lam Tan Phat",
  description:
    "Lam Tan Phat is a Frontend and Backend developer base in VietNam. He specializes in building web applications using modern technologies. He is passionate about building products that make a difference. In the future he wants to move towards Blockchain and AI.",
  twitter: {
    title: "Lam Tan Phat",
    description:
      "Lam Tan Phat is a Frontend and Backend developer base in VietNam. He specializes in building web applications using modern technologies. He is passionate about building products that make a difference. In the future he wants to move towards Blockchain and AI.",
    creator: "@LTPPPP",
    images: ["/website-preview.png"],
  },
  openGraph: {
    title: "Lam Tan Phat",
    description:
      "Lam Tan Phat is a Frontend and Backend developer base in VietNam. He specializes in building web applications using modern technologies. He is passionate about building products that make a difference. In the future he wants to move towards Blockchain and AI.",
    type: "website",
    url: "https://LamTanPhat.vercel.app",
    images: ["/website-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${animeAce.className} bg-dark-green text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

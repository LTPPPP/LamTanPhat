import type { Metadata } from "next";
import Head from "next/head";
import Chat from '@/app/chat';
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
    "Lam Tan Phat is a Frontend and Backend developer based in VietNam. He specializes in building web applications using modern technologies. He is passionate about building products that make a difference. In the future, he wants to move towards Blockchain and AI.",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="66x56" />
      </Head>
      <body
        className={`${animeAce.className} bg-dark-green text-white antialiased`}
        style={{
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
          {children}
        </main>
        <footer
          style={{
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          <Chat />
        </footer>
      </body>
    </html>
  );
}

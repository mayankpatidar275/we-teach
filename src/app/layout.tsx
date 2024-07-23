import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";
import ConfettiProvider from "@/components/providers/ConfettiProvider";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

// import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeTeach",
  description: "Learning and fun platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={`${inter.className} bg-gray-600 text-white`}>
        <ConfettiProvider />
        <ToasterProvider />
        <SessionProvider
          // Re-fetches session when window is focused
          refetchOnWindowFocus={true}
        >
          {children}
        </SessionProvider>
      </body>
    </html>
    // </ClerkProvider>
  );
}

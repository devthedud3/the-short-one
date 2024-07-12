import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "./(main)/Background/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Created by Corey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background />
        {children}
      </body>
    </html>
  );
}

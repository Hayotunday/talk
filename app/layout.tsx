import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talk - Video Conferencing App",
  description:
    "Talk is a modern video conferencing app built with Next.js and React for seamless communication.",
  keywords: [
    "video conferencing",
    "Next.js",
    "React",
    "real-time communication",
    "web app",
    "Talk app",
  ],
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

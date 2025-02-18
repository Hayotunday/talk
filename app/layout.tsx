import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talk",
  description: "Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider
    //   appearance={{
    //     layout: {
    //       socialButtonsVariant: "iconButton",
    //     },
    //     variables: {
    //       colorText: "#fff",
    //       colorPrimary: "#0E78F9",
    //       colorBackground: "#1C1F2E",
    //       colorInputBackground: "#252A41",
    //       colorInputText: "#fff",
    //     },
    //   }}
    // >
    <html lang="en">
      <body className={`${inter.className} bg-dark-2`}>
        {children}
        <Toaster />
      </body>
    </html>
    /* </ClerkProvider> */
  );
}

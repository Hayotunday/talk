import StreamVideoProvider from "@/provider/StreamClientProvider";
import AuthProvider from "@/provider/AuthProvider";
import type { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Talk",
  description: "Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <AuthProvider>
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
    // </AuthProvider>
  );
};

export default RootLayout;

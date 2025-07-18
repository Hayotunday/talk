import { ReactNode } from "react";

import StreamProvider from "@/components/providers/stream-provider";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamProvider>{children}</StreamProvider>
    </main>
  );
};

export default RootLayout;

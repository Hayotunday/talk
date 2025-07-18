"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";

import { tokenProvider } from "@/lib/actions/stream.action";
import Loading from "@/components/loading";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    const getVideoClient = async () => {
      const user = await getCurrentUser();
      const isAuth = await isAuthenticated();

      if (!isAuth || !user) return;

      if (!API_KEY) throw new Error("Stream API key is missing");

      const client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user.uid,
          name: user.display_name || user.uid,
          image: user.photo_url,
        },
        tokenProvider,
      });
      setVideoClient(client);
    };

    getVideoClient();
  }, []);

  if (!videoClient) return <Loading />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamProvider;

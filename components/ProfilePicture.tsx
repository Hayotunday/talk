"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/state/users";

const ProfilePicture = () => {
  const {
    user: { image, username },
  } = useUserStore();
  return (
    <Avatar className={"bg-slate-300"}>
      <AvatarImage src={image!} />
      <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePicture;

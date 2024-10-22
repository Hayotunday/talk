"use client";

import React, { useState } from "react";
import { useUserStore } from "@/state/users";
import Image from "next/image";
import { Button } from "./ui/button";
import ProfileModal from "./ProfileModal";

const ProfileSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    user: { image, email, username },
  } = useUserStore();

  return (
    <div className="text-white size-full">
      <div className="flex justify-center items-center">
        <Image
          src={image as string}
          alt="Profile Picture"
          height={100}
          width={100}
          className="rounded-full border"
        />
      </div>

      <div className="">
        <p className="text-center font-semibold text-slate-400">{email}</p>
        <p className="text-center text-3xl font-semibold">{username}</p>
      </div>

      {/* For number of calls */}
      {/* <div className="">

      </div> */}

      <div className="flex justify-center items-center mt-6">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="rounded-full bg-blue-1 text-center"
        >
          edit
        </Button>
      </div>

      <ProfileModal
        isOpen={isOpen === true}
        isUpdate={false}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ProfileSection;

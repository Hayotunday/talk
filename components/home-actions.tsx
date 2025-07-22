"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import JoinMeetingDialog from "@/components/join-meeting-dialog";
import LoginPromptDialog from "@/components/login-prompt-dialog";
import NewMeetingDialog from "@/components/new-meeting-dialog";

interface HomeActionsProps {
  isAuthenticated: boolean;
}

export default function HomeActions({ isAuthenticated }: HomeActionsProps) {
  const [isOpenNewMeeting, setIsOpenNewMeeting] = useState(false);
  const [isOpenJoinMeeting, setIsOpenJoinMeeting] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [redirectAction, setRedirectAction] = useState("");
  const router = useRouter();

  const handleNewMeeting = () => {
    if (isAuthenticated) {
      setIsOpenNewMeeting(true);
      setIsOpenJoinMeeting(false);
      setIsOpenLogin(false);
    } else {
      setIsOpenLogin(true);
      setIsOpenJoinMeeting(false);
      setIsOpenNewMeeting(false);
      setRedirectAction("new");
    }
  };

  const handleJoinMeeting = () => {
    if (isAuthenticated) {
      setIsOpenJoinMeeting(true);
      setIsOpenNewMeeting(false);
      setIsOpenLogin(false);
    } else {
      setIsOpenLogin(true);
      setIsOpenJoinMeeting(false);
      setIsOpenNewMeeting(false);
      setRedirectAction("join");
    }
  };

  const handleMeetingHistory = () => {
    if (isAuthenticated) {
      setIsOpenJoinMeeting(false);
      setIsOpenNewMeeting(false);
      setIsOpenLogin(false);
      router.push("/history");
    } else {
      setIsOpenLogin(true);
      setIsOpenJoinMeeting(false);
      setIsOpenNewMeeting(false);
      setRedirectAction("history");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button onClick={handleNewMeeting}>New Meeting</Button>
      <Button onClick={handleJoinMeeting}>Join Meeting</Button>
      <Button onClick={handleMeetingHistory}>Meeting History</Button>

      <NewMeetingDialog open={isOpenNewMeeting} setOpen={setIsOpenNewMeeting} />
      <JoinMeetingDialog
        open={isOpenJoinMeeting}
        setOpen={setIsOpenJoinMeeting}
      />
      <LoginPromptDialog
        open={isOpenLogin}
        setOpen={setIsOpenLogin}
        redirectAction={redirectAction}
      />
    </div>
  );
}

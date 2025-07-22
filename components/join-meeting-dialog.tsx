"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface JoinMeetingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function JoinMeetingDialog({
  open = false,
  setOpen = () => {},
}: JoinMeetingDialogProps) {
  const router = useRouter();
  const [callId, setCallId] = useState("");

  const handleJoin = async () => {
    const user = await getCurrentUser();
    if (!user) {
      const redirectUrl = "/";
      router.push(`/sign-in?redirectTo=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    const trimmedCallId = callId.trim();
    if (trimmedCallId) {
      // Extracts the last part of the path, which should be the meeting ID,
      // and removes any query parameters.
      const meetingId = trimmedCallId.split("/").pop()?.split("?")[0];

      if (!meetingId) {
        toast.error("Invalid meeting link or ID.");
        return;
      }

      router.push(`/meeting/${meetingId}`);
      setOpen(false);
      toast.success("Joining meeting...");
    } else {
      toast.error("Please enter a meeting ID or link.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            id="join-meeting-dialog"
            placeholder="Enter Meeting ID or Meeting link"
            value={callId}
            onChange={(e) => setCallId(e.target.value)}
          />
          <Button onClick={handleJoin} disabled={!callId}>
            Join
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

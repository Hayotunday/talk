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
      const redirectUrl = "/?action=join";
      router.push(`/sign-in?redirectTo=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    if (callId) {
      router.push(`/meeting/${callId}`);
      setOpen(false);
      toast.success("Joining meeting...");
    } else {
      toast.error("Please enter a valid meeting ID.");
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
            placeholder="Enter Meeting ID"
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

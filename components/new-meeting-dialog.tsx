"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
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

interface NewMeetingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NewMeetingDialog({
  open = false,
  setOpen = () => {},
}: NewMeetingDialogProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const user = await getCurrentUser();
    if (!user) {
      const redirectUrl = "/?action=new";
      router.push(`/sign-in?redirectTo=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    setLoading(true);
    try {
      const meetingRef = await addDoc(collection(db, "meetings"), {
        title,
        createdBy: user.uid,
        participants: [user.uid],
        startedAt: new Date(),
      });
      router.push(`/meeting/${meetingRef.id}`);
      toast.success("Meeting created successfully!");
    } catch (error) {
      toast.error("Failed to create meeting.");
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            id="new-meeting-dialog"
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={handleCreate} disabled={loading || !title}>
            {loading ? "Creating..." : "Create Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

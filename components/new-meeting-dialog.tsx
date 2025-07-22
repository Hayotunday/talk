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
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { generateRandomId } from "@/lib/utils";

interface NewMeetingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NewMeetingDialog({
  open = false,
  setOpen = () => {},
}: NewMeetingDialogProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [callDetail, setCallDetail] = useState<Call>();
  const [callCreated, setCallCreated] = useState(false);
  const router = useRouter();
  const client = useStreamVideoClient();

  const WINDOW_URL_ORIGIN =
    process.env.NEXT_PUBLIC_LOCAL_URL_ORIGIN || "http://localhost:3000";

  const handleCreate = async () => {
    const user = await getCurrentUser();
    if (!user) {
      const redirectUrl = "/";
      router.push(`/sign-in?redirectTo=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    if (!client || !user) return;
    setLoading(true);
    try {
      const id = generateRandomId();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = new Date(Date.now()).toISOString();
      const description = title || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      setCallCreated(true);
      console.log("Meeting Created: ", call);
      await addDoc(collection(db, "meetings"), {
        id: call.id,
        title: description,
        createdBy: user.uid,
        participants: [user.uid],
        createdAt: new Date(),
        summary: "",
      });
      toast.success("Meeting Created Successfully!");
    } catch (error) {
      toast.error("Failed to create meeting.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTitle("");
      setCallDetail(undefined);
      setCallCreated(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!callCreated ? (
            <>
              <Input
                id="new-meeting-dialog"
                placeholder="Meeting Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button onClick={handleCreate} disabled={loading || !title}>
                {loading ? "Creating..." : "Create Meeting"}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-lg font-semibold">Meeting Created</p>
              <div className="flex items-center space-x-2">
                <Input
                  readOnly
                  value={`${WINDOW_URL_ORIGIN}/meeting/${callDetail?.id}`}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (callDetail) {
                      navigator.clipboard.writeText(
                        `${WINDOW_URL_ORIGIN}/meeting/${callDetail.id}`
                      );
                      toast.success("Meeting link copied!");
                    }
                  }}
                >
                  Copy Link
                </Button>
              </div>
              <Button
                onClick={() => {
                  if (callDetail) {
                    router.push(`/meeting/${callDetail.id}`);
                  }
                }}
                className="w-full"
              >
                Start Meeting
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

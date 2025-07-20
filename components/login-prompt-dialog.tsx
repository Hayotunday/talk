"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginPromptDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  redirectAction?: string;
}

export default function LoginPromptDialog({
  open = false,
  setOpen = () => {},
  redirectAction,
}: LoginPromptDialogProps) {
  const router = useRouter();

  const handleLogin = () => {
    const redirectUrl = `/?action=${redirectAction}`;
    router.push(`/sign-in?redirectTo=${encodeURIComponent(redirectUrl)}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In Required</DialogTitle>
        </DialogHeader>
        <p>Please sign in to continue.</p>
        <Button onClick={handleLogin}>Sign In</Button>
      </DialogContent>
    </Dialog>
  );
}

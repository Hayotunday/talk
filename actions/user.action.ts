"use client"

import { useUserStore } from "@/state/users";

export const userProvider = async () => {
  const { user } = useUserStore()

  return user;
}
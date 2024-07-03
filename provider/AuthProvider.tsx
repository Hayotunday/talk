"use client";

import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/state/users";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { encrypt } from "@/constants/functions";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const key = process.env.NEXT_PUBLIC_SECRET_KEY;
  const url = `${pathname}?${params}`;

  const encryptedRoute = encrypt(`${url}`, key!);

  // useEffect(() => {
  //   if (!isLoggedIn) router.push(`/signin?redirect=${encryptedRoute}`);
  // }, []);

  return <main>{children}</main>;
};

export default AuthProvider;

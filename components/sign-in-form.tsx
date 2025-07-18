"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInWithEmailAndPassword } from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";

import { auth } from "@/lib/firebase/client";
import { signIn } from "@/lib/actions/auth.action";

const signInFormSchema = () => {
  return z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
};

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = signInFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { email, password } = data;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();
      if (!idToken) {
        toast.error("Sign in Failed. Please try again.");
        return;
      }

      await signIn({
        email,
        idToken,
      });

      toast.success("Signed in successfully.");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Talk</h2>
        </div>

        <h3>Sign in and continue where you left off</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          No account yet?
          <Link href="/sign-up" className="font-bold text-user-primary ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;

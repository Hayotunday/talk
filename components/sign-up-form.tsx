"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";

import { auth } from "@/lib/firebase/client";
import { signUp } from "@/lib/actions/auth.action";

const SignUpFormSchema = () => {
  return z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
};

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = SignUpFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { name, email, password } = data;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const result = await signUp({
        uid: userCredential.user.uid,
        name: name!,
        email,
        password,
        photo_url: "",
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      router.push("/sign-in");
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

        <h3>Join us free seamless meetings</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            <FormInput
              control={form.control}
              name="name"
              label="Display Name"
              placeholder="Your display name"
              type="text"
            />

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
              description="Password must be at least 6 characters long"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isLoading ? "Creating Account..." : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          Have an account already?
          <Link href="/sign-in" className="font-bold text-user-primary ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

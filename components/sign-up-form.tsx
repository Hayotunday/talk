"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    avatar: z.url().nonempty(),
  });
};

const SignUpForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const serachParams = useSearchParams();
  const redirectTo = serachParams.get("redirectTo");

  const formSchema = SignUpFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { name, email, password, avatar } = data;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const result = await signUp({
        uid: userCredential.user.uid,
        name: name!,
        email,
        photo_url: avatar,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      const signInUrl = redirectTo
        ? `/sign-in?redirectTo=${redirectTo}`
        : "/sign-in";
      router.push(signInUrl);
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getLinkHref = () => {
    if (redirectTo) {
      return `/sign-in?redirectTo=${redirectTo}`;
    }
    return "/sign-in";
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-6 py-3 px-10 lg:min-w-[566px] border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="font-bold ">Talk</h2>
        </div>

        <h3 className="font-medium">Sign in and continue where you left off</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 flex flex-col items-center"
          >
            <FormInput
              control={form.control}
              name="avatar"
              label="Avatar"
              placeholder="Your Avatar"
              type="image"
              handleChangeImage={handleImage}
            />
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
          <Link href={getLinkHref()} className="font-bold hover:underline ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

"use client";
import React, { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Errors } from "@/app/account/error/(account-errors)/errors";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const SignIn = () => {
  const [responseStatus, setResponseStatus] = useState(200);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) =>
    console.log("Submitted", data);

  if (sessionStatus == "authenticated") router.replace("/");

  if (sessionStatus == "unauthenticated")
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email")} label={"email"} />
        <Input {...register("password")} label={"password"} />

        <button type={"submit"}>Submit</button>
      </form>
    );
};

export default SignIn;

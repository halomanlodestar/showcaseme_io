"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Errors } from "@/app/account/error/(account-errors)/errors";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas/LoginSchema";

const Register = () => {
  const [responseStatus, setResponseStatus] = useState(200);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const form = useForm<z.infer<typeof LoginSchema>>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
    } catch (err) {
      console.log(responseStatus);
    }
  };

  return <form action=""></form>;
};

export default Register;

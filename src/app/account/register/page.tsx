"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  FormField,
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TailSpin } from "react-loader-spinner";
import { TiWarningOutline } from "react-icons/ti";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { register } from "@/actions/auth/register";
import { AuthActionResponse } from "../../../../types";
import { signIn } from "@/actions/auth/signin";
const SignIn = () => {
  const [response, setResponse] = useState<AuthActionResponse>();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    data,
  ) => {
    setResponse(undefined);
    setLoading(true);
    const response = await register({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    setResponse(response);
    setLoading(false);

    if (response.success) {
      await signIn({ email: data.email, password: data.password });
    }
  };

  return (
    <Card>
      <CardHeader className={"flex flex-row items-center justify-between"}>
        <CardTitle>Register</CardTitle>
        <div className={"flex items-center md:text-sm text-xs justify-center"}>
          or&nbsp;
          <Link
            href={"/account/signin"}
            className={"flex items-center justify-center text-blue-400"}
          >
            sign in <MdOutlineArrowOutward />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={"flex flex-col justify-center space-y-3"}>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type={"text"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type={"email"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type={"password"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {response?.error && (
                <div
                  className={`flex border-red-500 border items-center space-x-2 bg-destructive p-1.5 text-sm rounded`}
                >
                  <TiWarningOutline />
                  <span>{response?.error}</span>
                </div>
              )}

              <Link
                href={"/account/forgot"}
                className={"text-xs py-2 justify-end w-full flex text-blue-400"}
              >
                Forgot password?
              </Link>

              <Button disabled={loading} variant={"default"} size={`sm`}>
                {loading ? (
                  <TailSpin
                    visible={true}
                    height="20"
                    width="20"
                    color="black"
                    radius="1"
                    wrapperStyle={{
                      "font-weight": "10",
                    }}
                    wrapperClass=""
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
          <hr className={"py-2"} />
          <FormDescription>By clicking on &quot;&quot;</FormDescription>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;

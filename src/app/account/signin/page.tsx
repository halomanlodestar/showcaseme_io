"use client";
import React, { useState } from "react";
import { signIn } from "@/actions/auth/signin";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInSchema } from "@/schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  FormField,
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TailSpin } from "react-loader-spinner";
import { TiWarningOutline } from "react-icons/ti";
import { AuthActionResponse } from "../../../../types";
const SignIn = () => {
  const [response, setResponse] = useState<AuthActionResponse>();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof SignInSchema>> = async (
    data,
  ) => {
    setResponse(undefined);
    setLoading(true);
    const response = await signIn({
      email: data.email,
      password: data.password,
    });

    setResponse(response!);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader className={"flex flex-row items-center justify-between"}>
        <CardTitle>Sign In</CardTitle>
        <div className={"flex items-center md:text-sm text-xs justify-center"}>
          or&nbsp;
          <Link
            href={"/account/register"}
            className={"flex items-center justify-center text-blue-400"}
          >
            register <MdOutlineArrowOutward />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={"flex flex-col justify-center space-y-3"}>
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

              {response?.success && (
                <div
                  className={`flex border-red-500 border items-center space-x-2 bg-emerald-600 p-1.5 text-sm rounded`}
                >
                  <TiWarningOutline />
                  <span>{response?.success}</span>
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
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;

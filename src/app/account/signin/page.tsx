"use client";
import React from "react";
import { signIn } from "@/actions/auth";
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

const SignIn = () => {
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
    await signIn({
      email: data.email,
      password: data.password,
    });
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

              <Link
                href={"/account/forgot"}
                className={"text-xs py-2 justify-end w-full flex text-blue-400"}
              >
                Forgot password?
              </Link>

              <Button variant={"default"} size={"sm"}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;

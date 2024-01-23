import { NextRequest, NextResponse } from "next/server";
import { User } from ".prisma/client";
import { prisma } from "../../../../../prisma/prismaClient";
import { SafeUser } from "../../../../../types";
import { hash } from "bcrypt";
export async function POST(req: Request) {
  const { name, email, password, id } = (await req.json()) as User;

  if (!name) return Response.json({ error: "Invalid body" }, { status: 400 });

  const hashedPassword = await hash(password, 12);

  const checkUser = await prisma.user.findUnique({
    where: {
      email: email!,
    },
  });

  if (checkUser)
    return Response.json({ error: "user already exists" }, { status: 409 });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      id: id + "",
    },
  });

  if (user)
    return Response.json(
      {
        user: user as SafeUser,
      },
      { status: 200 },
    );

  return Response.error();
}

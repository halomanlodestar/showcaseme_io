import { NextRequest } from "next/server";

export async function middleware() {}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account/signin", "/account/register"],
};

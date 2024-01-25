import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
export async function middleware(request: NextRequest) {
  if (await getSession()) return NextResponse.redirect("/");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account/signin"],
};

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { authRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = authRoutes.includes(req.nextUrl.pathname);

  if (isLoggedIn && isAuthPage) return Response.redirect(new URL("/", req.url));
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

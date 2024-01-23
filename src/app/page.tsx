"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      <h1>{session?.user?.name}</h1>
      <button onClick={() => signIn()}>SignIn</button>
      <button onClick={() => signOut()}>SignOut</button>
    </main>
  );
}

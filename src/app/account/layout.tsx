import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={
        "w-full flex flex-col space-y-7 h-[calc(100dvh-4rem)] items-center justify-center"
      }
    >
      {children}
    </main>
  );
};

export default Layout;

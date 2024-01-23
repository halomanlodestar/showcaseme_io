import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className={"flex justify-between h-16 border-b border-white/20"}>
      <nav
        className={
          "h-full flex items-center justify-center text-sm md:text-base px-4"
        }
      >
        <Link href={"/"}>Showcase Me</Link>
      </nav>
      <nav className={"bg-red-500 w-10 h-full"}>
        <ul>
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

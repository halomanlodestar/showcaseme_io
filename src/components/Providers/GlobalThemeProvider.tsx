"use client";
import { ThemeProvider } from "next-themes";

const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default GlobalThemeProvider;

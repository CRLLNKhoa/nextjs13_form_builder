import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2 sticky top-0 bg-background">
        <Logo />
        <ThemeSwitcher />
        <UserButton afterSignOutUrl="/sign-in" />
      </nav>
      <main className="flex flex-grow">{children}</main>
    </div>
  );
}

export default Layout;

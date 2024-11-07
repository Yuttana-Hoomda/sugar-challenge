"use client";

import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/BottomBar";
import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NextAuthProviderProps {
  children: ReactNode;
}

export const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children }) => {
  const pathname = usePathname()
  
  if (pathname === "/" || pathname === "/register" || pathname === '/createUser') {
    return (
      <SessionProvider>
        <div className="py-8 px-6">
          {children}
        </div>
      </SessionProvider>
    )
  }

  return (
  <SessionProvider>
    <div className="h-screen flex flex-col relative">
      <Header />
      <main className="flex-grow py-8 px-6">{children}</main>
      <NavBar IconSize={25} />
    </div>
  </SessionProvider>
  );
};

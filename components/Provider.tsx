"use client";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session?: any;
};

export default function Provider({ children, session = null }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

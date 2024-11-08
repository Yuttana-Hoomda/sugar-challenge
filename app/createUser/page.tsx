"use client";

import { useSession } from "next-auth/react";
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateUserPage() {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  if (status === "loading") {
    return <p>กำลังโหลด...</p>;
  }

  if (status === "unauthenticated" && !email) {
    return <p>กรุณาเข้าสู่ระบบก่อนใช้งาน</p>;
  }

  return (
    <div className="px-6 py-8">
    <div className="text-center font-light text-2xl">Hey there,</div>
    <div className="text-center mt-4 font-bold text-3xl">
      Create an account
    </div>
      <CreateUserForm email={email ?? ''}/>
    </div>
  );
}
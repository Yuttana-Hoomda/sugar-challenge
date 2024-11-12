"use client";

import { useSession } from "next-auth/react";
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateUserPage() {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  if (status === "loading") {
    return <p>กำลังโหลด...</p>;
  }

  return (
    <div>
    <div className="text-center mt-4 font-bold text-3xl">
      แก้ไขข้อมูลส่วนตัว
    </div>
      <CreateUserForm email={email ?? ''}/>
    </div>
  );
}

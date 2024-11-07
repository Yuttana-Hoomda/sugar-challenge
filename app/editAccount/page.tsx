"use client";

import { useSession } from "next-auth/react";
import CreateUserForm from '@/components/CreateUserForm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateUserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>กำลังโหลด...</p>;
  }


  return (
    <div>
    <div className="text-center mt-4 font-bold text-3xl">
      แก้ไขข้อมูลส่วนตัว
    </div>
      <CreateUserForm />
    </div>
  );
}


// "use client";

// import { useSession } from "next-auth/react";
// import CreateUserForm from '@/components/CreateUserForm';
// import { useSearchParams } from 'next/navigation';

// export default function CreateUserPage() {
//   const { data: session, status } = useSession();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   console.log('Session:', session);
//   console.log('Status:', status);
//   console.log('Email from query:', email);

//   if (status === "loading") {
//     return <p>กำลังโหลด...</p>;
//   }

//   if (status === "unauthenticated") {
//     return <p>กรุณาเข้าสู่ระบบก่อนใช้งาน</p>;
//   }

//   if (!session?.user?.email && !email) {
//     return <p>ไม่พบอีเมล กรุณาเข้าสู่ระบบอีกครั้ง</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">สร้างโปรไฟล์ผู้ใช้</h1>
//       <CreateUserForm email={session?.user?.email || email || ''} />
//     </div>
//   );
// }
// import CreateUserForm from '@/components/CreateUserForm';

// export default function CreateUserPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">เทสสร้างโปรไฟล์ผู้ใช้</h1>
//       <CreateUserForm />
//     </div>
//   );
// }



// import CreateUserForm from '@/components/CreateUserForm';

// export default function CreateUserPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">เทสสร้างโปรไฟล์ผู้ใช้</h1>
//       <CreateUserForm />
//     </div>
//   );
// }
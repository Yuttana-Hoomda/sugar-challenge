<<<<<<< HEAD
import React from 'react'

const LoginPage = () => {
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage
=======
import UserLogin from "@/components/UserLogin";

export default function Home() {
  return (
    <div className="grid place-items-center h-screen -mt-24">
      <UserLogin />
    </div>
  );
}
>>>>>>> 20f1b05 (create: auth login, api creature and get user)

import { signIn } from "next-auth/react";
import Image from "next/image";
import googleLogo from '@/public/icons/google-Logo.svg'

export default function GoogleSigin() {
    const handleSignIn = () => {
        signIn('google', { callbackUrl: '/home' })
    }
    return (
        <div className="justify-center items-center w-full px-14">
            <button onClick={handleSignIn} type="button" className="text-blue bg-white flex border border-blue w-full py-3 gap-4 rounded-lg justify-center items-center shadow-login-button">
                <Image src={googleLogo} alt="google-logo" width={25} height={25} />
                <h2 className="font-medium text-lg">เข้าสู่ระบบ</h2>
            </button>
        </div>
    );

}
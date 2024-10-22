import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        const session = await getServerSession(authOptions);

        const email = session.user.email;
        const user = User.findOne({email})

        return NextResponse.json(user)

    } catch (error) {
        
    }
}
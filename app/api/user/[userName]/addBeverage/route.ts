import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request, {params} : {params: {userName: string}}) => {
    try {
        await connect();
        const {userName} = params
        const newBeverageHistory = await req.json()
        const user = await User.findOne({name: userName})

        if (user.beverageHistory.length >= 4) {
            user.beverageHistory.pop()
        }

        user.beverageHistory.unshift(newBeverageHistory)
        await user.save()
        return NextResponse.json(user, {status: 200})
    } catch (error: any) {
        return new NextResponse("Error in fetching users: " + error.message, { status: 500 });
    }
}
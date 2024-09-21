import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, {params}: {params: {userName: string}}) => {
    try {
        await connect();
        const {userName} = params;
        const users = await User.findOne({name: userName});
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err: any) {
        return new NextResponse("Error in fetching users: " + err.message, { status: 500 });
    }
};

//ถ้านิวจะเขีบนmethodเพิ่มให้สร้าง folder นะ (ชื่อ path ตามขื่อ folder)
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function POST(req) {
    const email = req.nextUrl.searchParams.get("email");
    const { date, value } = await req.json(); 

    try {
        await connectToDB();

        let user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
        }

        user.dailySugar.push({ date, value });
        await user.save();

        return NextResponse.json({ message: "Daily sugar value added successfully", user });
    } catch (error) {
        console.error("Error adding daily sugar value:", error);
        return NextResponse.json({ message: "Error adding daily sugar value" }, { status: 500 });
    }
}

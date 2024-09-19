import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        // Set default values for fields if not provided
        const defaultValues = {
            name: "Unknown",
            gender: "Unknown",
            weight: 0,
            height: 0,
            bmi: 0,
            currentSugar: 0,
            beverageHistory: [],
            dailySugar: []
        };

        // Merge default values with the body
        const userData = { ...defaultValues, ...body };

        await connect();
        const newUser = new User(userData);
        await newUser.save();

        return new NextResponse(
            JSON.stringify({ message: 'User is created', user: newUser }),
            { status: 200 }
        );
    } catch (err: any) {
        return new NextResponse("Error in creating user: " + err.message, { status: 500 });
    }
}

export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err: any) {
        return new NextResponse("Error in fetching users: " + err.message, { status: 500 });
    }
};

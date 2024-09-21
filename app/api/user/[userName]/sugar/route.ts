import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

// POST request to add a new daily sugar value for the user
export const POST = async (req: Request, { params }: { params: { userName: string } }) => {
    try {
        await connect();
        const { userName } = params;

        const newDailySugar = await req.json();

        // Validate incoming data
        if (!newDailySugar.date || !newDailySugar.value) {
            return new NextResponse("Date and value are required.", { status: 400 });
        }

        // Find the user by username
        const user = await User.findOne({ name: userName });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const dailySugarEntry = {
            date: new Date(newDailySugar.date), 
            value: newDailySugar.value
        };

        
        user.dailySugar.push(dailySugarEntry);

        await user.save();

        // Return the updated user data
        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error in creating dailySugar: " + error.message, { status: 500 });
    }
};

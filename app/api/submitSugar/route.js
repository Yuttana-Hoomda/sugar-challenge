import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/connectToDB';
import User from '@/models/user';

export const POST = async (req) => {
    try {
        const email = req.nextUrl.searchParams.get("email");
        const { date, value } = await req.json();

        await connectToDB();

        let user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Convert the date string to a Date object
        const dateToCheck = new Date(date);
        
        // Check if the date already exists in user.dailysugar
        const existingEntry = user.dailysugar.find(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getDate() === dateToCheck.getDate() &&
                   entryDate.getMonth() === dateToCheck.getMonth() &&
                   entryDate.getFullYear() === dateToCheck.getFullYear();
        });

        if (existingEntry) {
            // If it exists, update the existing entry
            existingEntry.value = value; // Update the value (or other fields if needed)
            console.log("Daily sugar value updated for date:", date);
        } else {
            // If it doesn't exist, push a new entry
            user.dailysugar.push({ date: dateToCheck, value });
            console.log("Daily sugar value added for date:", date);
        }

        // Save the user after modifications
        await user.save();

        return NextResponse.json({ message: "Daily sugar value added/updated successfully", user });
    } catch (error) {
        console.error("Error adding/updating daily sugar value:", error);
        return NextResponse.json({ message: "Error adding/updating daily sugar value" }, { status: 500 });
    }
};

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";
import DailySugar from "@/models/dailySugar";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    const { date, value } = await req.json();

    const user = await User.findOne({email});

    await connectToDB();

    const updatedEntry = await DailySugar.findOneAndUpdate(
        { user_id: user._id, "dailySugar.date": date },
        { $inc: { "dailySugar.$.value": value } },
      );
  
    if(!updatedEntry) {
      const newEntry = await DailySugar.findOneAndUpdate(
        { user_id: user._id },
        {
          $push: {
            dailySugar: {
              $each: [{ date: date, value: value }],
              $position: 0, 
            },
          },
        },
        { new: true, upsert: true }
      );
    }

    return NextResponse.json({
      message: "Daily sugar value updated successfully",
    });
  } catch (error) {
    console.error("Error updating daily sugar value:", error);
    return NextResponse.json(
      { message: "Error updating daily sugar value" },
      { status: 500 }
    );
  }
}

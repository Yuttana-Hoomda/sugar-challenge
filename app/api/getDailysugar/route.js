import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";
import DailySugar from "@/models/dailySugar";

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // Connect to the database
    await connectToDB();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the daily sugar records associated with the user's ID
    const dailySugarRecord = await DailySugar.findOne({ user_id: user._id });
    if (!dailySugarRecord || !dailySugarRecord.dailySugar) {
      console.log("DailySugar data not found");
      return NextResponse.json({ message: "Daily sugar data not found" }, { status: 404 });
    }

    // Send the entire dailySugar array to the client
    return NextResponse.json({
      message: "Daily sugar data retrieved successfully",
      dailySugar: dailySugarRecord.dailySugar,
    });
  } catch (error) {
    console.error("Error getting daily sugar data:", error);
    return NextResponse.json(
      { message: "Error getting daily sugar data" },
      { status: 500 }
    );
  }
};

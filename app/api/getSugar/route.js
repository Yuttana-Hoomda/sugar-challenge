import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";
import DailySugar from "@/models/dailySugar";

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
      // return session;
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    await connectToDB();

    let user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set to the start of the day (00:00:00)

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day (23:59:59.999)

    const dailySugar = await DailySugar.find({
      created_at: {
        $gte: startOfDay, // Greater than or equal to start of today
        $lt: endOfDay, // Less than the end of today
      },
    });

    return NextResponse.json({
      message: "Daily sugar value added successfully",
      sugarValue: dailySugar.reduce((accumulator, item) => {
        return accumulator + item.value;
      }, 0),
      dailySugar,
    });
  } catch (error) {
    console.error("Error adding daily sugar value:", error);
    return NextResponse.json(
      { message: "Error adding daily sugar value" },
      { status: 500 }
    );
  }
};

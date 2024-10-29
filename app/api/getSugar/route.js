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

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const dailySugarRecord = await DailySugar.findOne({ user_id: user._id });
    console.log("DailySugar Record:", dailySugarRecord);

    const { date, value } = dailySugarRecord && dailySugarRecord.dailySugar && dailySugarRecord.dailySugar.length > 0
      ? dailySugarRecord.dailySugar[0]
      : { date: null, value: 0 };
      console.log(date);
      console.log(value);

    return NextResponse.json({
      message: "Daily sugar value retrieved successfully",
      date,
      value
    });
  } catch (error) {
    console.error("Error getting daily sugar value:", error);
    return NextResponse.json(
      { message: "Error getting daily sugar value" },
      { status: 500 }
    );
  }
};

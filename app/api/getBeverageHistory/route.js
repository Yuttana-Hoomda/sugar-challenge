import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import BeverageHistory from "@/models/beverageHistory";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    await connectToDB();

    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const beverageHistory = await BeverageHistory.findOne({ user_id: user._id });

    if (!beverageHistory) {
      return NextResponse.json({ message: "Beverage history not found" }, { status: 404 });
    }

    const beverageList = beverageHistory.beverageList
    console.log(beverageList)

    return NextResponse.json(beverageList);
  } catch (error) {
    console.error("Error fetching beverage history:", error);
    return NextResponse.json(
      { message: "Error fetching beverage history", error: error.message },
      { status: 500 }
    );
  }
};

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import BeverageHistory from "@/models/beverageHistory";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const beverageData = await req.json();

    const newCreateAt = beverageData.createAt;
    if (!newCreateAt) {
      return NextResponse.json({ message: "Invalid beverage data" }, { status: 400 });
    }

    let beverageHistory = await BeverageHistory.findOne({ user_id: user._id });
    if (!beverageHistory) {
      beverageHistory = new BeverageHistory({
        user_id: user._id,
        beverageList: [],
      });
    }

    if (newCreateAt !== beverageHistory.beverageList[0].createAt) {
      beverageHistory.beverageList = [];
    }

    if (beverageHistory.beverageList.length >= 4) {
      beverageHistory.beverageList.pop();
    }

    beverageHistory.beverageList.unshift(beverageData);

    await beverageHistory.save();

    return NextResponse.json(beverageHistory);
  } catch (error) {
    console.error("Error submitting beverage:", error);
    return NextResponse.json(
      { message: "Error submitting beverage", error: error.message },
      { status: 500 }
    );
  }
};

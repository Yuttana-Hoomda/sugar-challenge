import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";
import DailySugar from "@/models/dailySugar";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
      // return session;
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const { menu, quantities, sweetLevel, value } = await req.json();

    await connectToDB();

    let user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
    }

    const dailySugar = await DailySugar.create({
      user_id: user.id, 
      menu,
      quantities,
      sweetLevel,
      value: value,
      created_at: new Date(),
    });

    return NextResponse.json({
      message: "Daily sugar value added successfully",
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

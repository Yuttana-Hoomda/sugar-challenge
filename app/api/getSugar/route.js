import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    await connectToDB();

    let user = await User.findOne({email});

    if (!user) {
      console.log("User not found");
    }

    const dailySugar = user.dailySugar[0] || 0;
    console.log(dailySugar)

    return NextResponse.json(
      dailySugar
    );
  } catch (error) {
    console.error("Error get daily sugar value:", error);
    return NextResponse.json(
      { message: "Error get daily sugar value" },
      { status: 500 }
    );
  }
};

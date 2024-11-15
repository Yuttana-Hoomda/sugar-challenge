import { NextResponse } from "next/server"; // นำเข้า NextResponse
import { connectToDB } from "@/utils/connectToDB";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import User from "@/models/user";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  try {
    await connectToDB();
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userDoc, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


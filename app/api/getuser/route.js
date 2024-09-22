import { NextResponse } from "next/server"; // นำเข้า NextResponse
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";

export async function GET(req) {
  const email = req.nextUrl.searchParams.get("email");
  
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

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

import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export const POST = async (req: { json: () => PromiseLike<{ userId: any; token: any; }> | { userId: any; token: any; }; }) => {
  try {
    await connect();
    const { userId, token } = await req.json();

    // บันทึก Firebase Token ลง MongoDB
    await User.updateOne({ _id: userId }, { $set: { fcmToken: token } });

    return new NextResponse("Token saved successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error saving token: " + error.message, { status: 500 });
  }
};

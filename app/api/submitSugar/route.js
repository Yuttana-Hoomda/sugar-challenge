import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    // const email = session.user.email;
    const email = 'yhumda@gmail.com'
    const { date, value } = await req.json();

    await connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: email, "dailySugar.date": date },
      { $inc: { "dailySugar.$.value": value } },
      { new: true }
    );

    if (!updatedUser) {
      const result = await User.findOneAndUpdate(
        { email: email },
        {
          $push: {
            dailySugar: {
              $each: [{ date: date, value: value }],
              $position: 0
            }
          }
        },
        { new: true }
      );
      return NextResponse.json({ message: "New daily sugar entry added at index 0", result });
    }

    return NextResponse.json({
      message: "Daily sugar value updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating daily sugar value:", error);
    return NextResponse.json(
      { message: "Error updating daily sugar value" },
      { status: 500 }
    );
  }
};



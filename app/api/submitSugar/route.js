import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDB } from '@/utils/connectToDB';
import User from '@/models/user';

export async function POST(req, res) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session || !session.user) {
      console.log("Unauthorized: No session or user");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const { date, value } = await req.json();

    await connectToDB();

    let user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedEntry = await DailySugar.findOneAndUpdate(
        { user_id: user._id, "dailySugar.date": date },
        { $inc: { "dailySugar.$.value": value } },
      );
  
    if(!updatedEntry) {
      const newEntry = await DailySugar.findOneAndUpdate(
        { user_id: user._id },
        {
          $push: {
            dailySugar: {
              $each: [{ date: date, value: value }],
              $position: 0, 
            },
          },
        },
        { new: true, upsert: true }
      );
    }

    user.dailySugar.push({ date, value });
    await user.save();

    return NextResponse.json({ message: "Daily sugar value added successfully", user });
  } catch (error) {
    console.error("Error adding daily sugar value:", error);
    return NextResponse.json({ message: "Error adding daily sugar value", error: error.message }, { status: 500 });
  }
}
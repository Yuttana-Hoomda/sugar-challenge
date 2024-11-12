import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectToDB();
    const { name , email, gender, weight, height, bmi } = await req.json();
    
    // Validate required fields
    if (!email || !gender || !weight || !height || !bmi) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check for valid number inputs
    if (isNaN(weight) || isNaN(height) || isNaN(bmi)) {
      return NextResponse.json({ message: 'Invalid number values for weight, height, or BMI' }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { 
        $set: {
          name,
          gender,
          weight: Number(weight),
          height: Number(height),
          bmi: Number(bmi),
        }
      },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

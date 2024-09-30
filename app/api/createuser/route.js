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
          currentSugar: 0,
          beverageHistory: [],
          dailySugar: []
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


// import { connectToDB } from "@/utils/connectToDB";
// import User from "@/models/user";
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     await connectToDB();
//     const { email, gender, weight, height, bmi } = await req.json();
    
//     if (!email) {
//       return NextResponse.json({ message: 'Email is required' }, { status: 400 });
//     }

//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       { 
//         $set: {
//           gender,
//           weight: Number(weight),
//           height: Number(height),
//           bmi: Number(bmi),
//           // เพิ่มฟิลด์อื่นๆ ที่ต้องการอัพเดทด้วย default value ถ้าจำเป็น
//           currentSugar: 0,
//           beverageHistory: [],
//           dailySugar: []
//         }
//       },
//       { new: true, upsert: true, runValidators: true }
//     );

//     return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
//   }
// }

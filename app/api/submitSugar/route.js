import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDB } from '@/utils/connectToDB';
import User from '@/models/user';
import { getSession } from 'next-auth/react';

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

    user.dailySugar.push({ date, value });
    await user.save();

    return NextResponse.json({ message: "Daily sugar value added successfully", user });
  } catch (error) {
    console.error("Error adding daily sugar value:", error);
    return NextResponse.json({ message: "Error adding daily sugar value", error: error.message }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server'
    // import { getServerSession } from 'next-auth/next'
    // import { authOptions } from '../auth/[...nextauth]/route'
    // import { connectToDB } from '@/utils/connectToDB'
    // import User from '@/models/user'
    // import { getSession } from 'next-auth/react'


    // export const POST = async (req) => {
    //     try {
    //         const session = await getServerSession(authOptions);
    //         console.log(session);
    //         if (!session) {
    //             return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //         }

    //         const userId = session.user.id; // ใช้ user id แทน
    //         const { date, value } = await req.json();

    //         await connectToDB();

    //         let user = await User.findById(userId); // ค้นหาผู้ใช้ด้วย user id

    //         if (!user) {
    //             console.log("User not found");
    //             return NextResponse.json({ message: "User not found" }, { status: 404 });
    //         }

    //         user.dailySugar.push({ date, value });
    //         await user.save();

    //         return NextResponse.json({ message: "Daily sugar value added successfully", user });
    //     } catch (error) {
    //         console.error("Error adding daily sugar value:", error);
    //         return NextResponse.json({ message: "Error adding daily sugar value" }, { status: 500 });
    //     }
    // }


// export const POST = async (req) => {
//     try {
//         const session = await getServerSession(authOptions)
//         console.log(session)
//         if (!session) {
//             return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//         }

//         const email = session.user.email;
//         const { date, value } = await req.json();

//         await connectToDB();

//         let user = await User.findOne({ email });

//         if (!user) {
//             console.log("User not found");
//         }

//         user.dailySugar.push({ date, value });
//         await user.save();

//         return NextResponse.json({ message: "Daily sugar value added successfully", user });
//     } catch (error) {
//         console.error("Error adding daily sugar value:", error);
//         return NextResponse.json({ message: "Error adding daily sugar value" }, { status: 500 });
//     }
// }
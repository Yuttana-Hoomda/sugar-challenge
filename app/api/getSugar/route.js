// /app/api/getSugar/route.js
import { NextResponse } from 'next/server';
import connectToDB from '@/utils/connectToDB'; // ฟังก์ชันเชื่อมต่อ MongoDB
import User from '@/models/user'; // Import User model

export async function GET(request) {
  try {
    await connectToDB();
    
    const email = new URL(request.url).searchParams.get('email'); // รับ email จาก query
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user.dailySugar);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch daily sugar' }, { status: 500 });
  }
}

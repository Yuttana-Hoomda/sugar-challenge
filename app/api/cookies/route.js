import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const handler = async (req) => {
  const method = req.method;

  if (method === 'POST') {
    // Handle POST request
    const { addValue } = await req.json();
    const cookieHeader = req.headers.get('cookie') || '';
    const cookieMatch = cookieHeader.match(/sugarValue=(\d+)/);
    const currentValue = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;

    const newValue = currentValue + addValue;

    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const response = NextResponse.json({
      success: true,
      newValue,
    });

    // Set the updated cookie
    response.headers.set(
      'Set-Cookie',
      `sugarValue=${newValue}; Path=/; HttpOnly; SameSite=None; Secure=${process.env.NODE_ENV === 'production'}`
    );

    return response;
  } else if (method === 'GET') {
    // Handle GET request
    const cookieStore = cookies();
    const sugarValue = parseInt(cookieStore.get('sugarValue') || '0', 10);

    return NextResponse.json({
      sugarValue,
    });
  } else {
    // Handle unsupported methods
    return NextResponse.json(
      { message: 'Method not allowed' },
      { status: 405 }
    );
  }
};

import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
  
      // Make a POST request from API B to API A
      const response = await fetch('http://localhost:3000/api/cookies', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are included in requests
      });
  
      // Get response data from API A
      const data = await response.json();
  
      // Log the response from API A
      console.log('Response from API A:', data);
  
      // Send the response from API A to the client
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error calling API A:', error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }
  };
  
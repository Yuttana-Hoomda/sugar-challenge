"use client";
import { useEffect, useState } from "react";

const GetUser = () => {
  interface User {
    name: string;
    email: string;
    gender: string;
    weight: number;
    height: number;
    bmi: number;
    currentSugar: number;
    beverageHistory: string[];
    dailySugar: string[];
  }
  
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const email = new URLSearchParams(window.location.search).get("email");
      const response = await fetch(`/api/getuser?email=${email}`);
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    };
    
    fetchUser();
  }, []);
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Weight: {user.weight}</p>
      <p>Height: {user.height}</p>
      <p>BMI: {user.bmi}</p>
      <p>Current Sugar: {user.currentSugar}</p>
      <p>Beverage History: {user.beverageHistory.join(", ")}</p>
      <p>Daily Sugar: {user.dailySugar.join(", ")}</p>
    </div>
  );
};

export default GetUser;

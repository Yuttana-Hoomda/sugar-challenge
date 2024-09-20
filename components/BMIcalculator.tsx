import React, { useState } from 'react';
import CircularProgressBMI from '@/components/CircularProgressBMI'; // Adjust the import path as necessary

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-5 mb-4">
        <div className="flex border border-indigo-950 rounded-lg items-center bg-white p-3">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="flex-1 outline-none"
          />
        </div>
        <div className="flex border border-indigo-950 rounded-lg items-center bg-white p-3">
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="flex-1 outline-none"
          />
        </div>
      </div>
      <button
        onClick={calculateBMI}
        className="text-white font-medium text-lg rounded-lg bg-blue-500 px-6 py-3"
      >
        Calculate BMI
      </button>
      {bmi !== null && (
        <div className="mt-4">
          <CircularProgressBMI bmiValue={bmi} size={200} />
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
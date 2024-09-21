'use client';
import React, { useEffect, useState } from 'react';

interface CircularProgressPropsBMI {
  bmiValue: number;
  size: string; // Changed to string to accept percentage values
  strokeColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

const CircularProgressBMI: React.FC<CircularProgressPropsBMI> = ({
  bmiValue,
  size,
  strokeColor = 'url(#gradient)',
  backgroundColor = '#e6e6e6',
  textColor = '#000',
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [dashOffset, setDashOffset] = useState(0);
  const radius = 50; // Fixed radius for relative sizing
  const padding = radius / 10; // Adjusted padding for better balance
  const outerCircleRadius = radius - padding / 2;
  const dashArray = outerCircleRadius * Math.PI * 2;

  const maxValue = 40; // Adjusted maxValue to a more realistic range for BMI
  const duration = 1000; // Increased duration to slow down the animation

  useEffect(() => {
    let start = 0;
    const increment = bmiValue / (duration / 10);
    const animate = () => {
      start += increment;
      if (start >= bmiValue) {
        setAnimatedValue(bmiValue);
        setDashOffset(dashArray - (dashArray * bmiValue) / maxValue);
      } else {
        setAnimatedValue(start);
        setDashOffset(dashArray - (dashArray * start) / maxValue);
        setTimeout(animate, 10);
      }
    };
    animate();
  }, [bmiValue, duration, dashArray, maxValue]);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
  };

  const svgStyle = {
    width: '100%',
    height: '100%',
  };

  const textStyle = {
    fontSize: '1.5rem', // Fixed font size for better readability
    fill: textColor,
  };

  return (
    <div style={containerStyle}>
      <svg
        viewBox="0 0 100 100"
        style={svgStyle}
      >
        <defs>
          <linearGradient id='gradient'>
            <stop offset='10%' stopColor='#002D63' />
            <stop offset='50%' stopColor='#4F80C0' />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          strokeWidth={padding}
          r={outerCircleRadius}
          fill="none"
          stroke={backgroundColor}
        />
        <circle
          cx="50"
          cy="50"
          strokeWidth={padding}
          r={outerCircleRadius}
          fill="none"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          stroke={strokeColor}
          transform="rotate(-90 50 50)" // Start from the top
        />
        <text
          x='50%'
          y='50%'
          dominantBaseline='middle'
          textAnchor='middle'
          style={textStyle}
        >
          {animatedValue.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBMI;
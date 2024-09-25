'use client'
import React, { useEffect, useState } from 'react'

interface CircularProgressProps {
  sugarValue: number,
  size: number
}

const CircularProgress:React.FC<CircularProgressProps> = ({sugarValue, size}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('#002D63');
  const [secondaryColor, setSecondaryColor] = useState('#4F80C0');
  const [text, setText] = useState('ปกติ')

  const radius = size / 2;
  const padding = radius / 6;
  const outerCircleRadius = radius - padding / 2;
  const dashArray = radius * Math.PI * 2;

  const maxValue = 20
  const duration = 500

  const cappedSugarValue = Math.min(sugarValue, maxValue);
  const dashOffset = dashArray - (dashArray * cappedSugarValue) / maxValue;

  useEffect(() => {
    let start = animatedValue;
    const increment = sugarValue / (duration / 10);

    const animate = () => {
      start += increment;
      if (start >= sugarValue) {
        setAnimatedValue(Math.min(sugarValue, maxValue));
      } else {
        setAnimatedValue(start)
        setTimeout(animate, 10);
      }
    };
    animate()
    if (sugarValue >= maxValue) {
      setPrimaryColor('#D2042D');
      setSecondaryColor('#F88379');
      setText('เกินมาตรฐาน')
    }
  },[sugarValue, duration])
  return (
    <div>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id='gradient'>
            <stop offset='10%' stopColor={primaryColor}/>
            <stop offset='50%' stopColor={secondaryColor}/>
          </linearGradient>
        </defs>

        <circle 
          cx={radius}
          cy={radius}
          strokeWidth={padding}
          r={outerCircleRadius}
          className='fill-none stroke-white'
        />
        <circle 
          cx={radius}
          cy={radius}
          strokeWidth={padding}
          r={outerCircleRadius}
          className='fill-none'
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.5s ease-in-out'
          }}
          transform={` rotate(90 ${radius} ${radius})`}
          stroke='url(#gradient)'
        />
        <text
          x='50%'
          y='48%'
          dy='0.3rem'
          textAnchor='middle'
          className='text-[45px] font-bold'
          fill={primaryColor}
        >
          {Math.round(sugarValue)} g
        </text>
        <text
          x='50%'
          y='70%'
          textAnchor='middle'
          className='text-[16px]'
          fill={secondaryColor}
        >
          {text}
        </text>
      </svg>
    </div>
  )
}

export default CircularProgress
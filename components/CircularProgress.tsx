'use client'
import React, { useEffect, useState } from 'react'

interface CircularProgressProps {
  sugarValue: number,
  size: number
}

const CircularProgress:React.FC<CircularProgressProps> = ({sugarValue, size}) => {
  const [animatedValue, setAnimatedValue] = useState(0)
  const radius = size / 2;
  const padding = radius / 6;
  const outerCircleRadius = radius - padding / 2;
  const dashArray = radius * Math.PI * 2;

  const maxVlaue = 20
  const duration = 500
  const dashOffset = dashArray - (dashArray * sugarValue) / maxVlaue

  useEffect(() => {
    let start = 0;
    const increment = sugarValue / (duration / 10)
    const animate = () => {
      start += increment;
      if (start >= sugarValue) {
        setAnimatedValue(sugarValue)
      } else {
        setAnimatedValue(start)
        setTimeout(animate, 10)
      }
    };
    animate()
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
            <stop offset='10%' stopColor='#002D63'/>
            <stop offset='50%' stopColor='#4F80C0'/>
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
          fill='#002D63'
        >
          {Math.round(animatedValue)} g
        </text>
        <text
          x='50%'
          y='70%'
          textAnchor='middle'
          className='text-[16px]'
          fill='#4F80C0'
        >
          ปกติ
        </text>
      </svg>
    </div>
  )
}

export default CircularProgress
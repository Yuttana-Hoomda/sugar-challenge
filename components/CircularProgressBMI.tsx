'use client'
import React, { useEffect, useState } from 'react'

interface CircularProgressBMI{
    bmiValue: number,
    size: number
}

const CircularProgressBMI:React.FC<CircularProgressBMI> = ({bmiValue, size}) => {
    const [animatedValue, setAnimatedValue] = useState(0)
    const radius = size / 2;
    const padding = radius / 6;
    const outerCircleRadius = radius - padding / 2;
    const dashArray = radius * Math.PI * 2;

    const maxVlaue = 20
    const duration = 500
    const dashOffset = dashArray - (dashArray * bmiValue) / maxVlaue

    

    useEffect(() => {
        let start = 0;
        const increment = bmiValue / (duration / 10)
        const animate = () => {
            start += increment;
            if (start >= bmiValue) {
                setAnimatedValue(bmiValue)
            } else {
                setAnimatedValue(start)
                setTimeout(animate, 10)
            }
        };
        animate()
    },[bmiValue, duration])
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
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    stroke='url(#gradient)'
                />
                <text
                    x='50%'
                    y='50%'
                    dominantBaseline='middle'
                    textAnchor='middle'
                    fontSize='2.5rem'
                    fill='#4F80C0'
                >
                    {animatedValue.toFixed(1)}
                </text>
            </svg>
        </div>
    )
}

export default CircularProgressBMI;
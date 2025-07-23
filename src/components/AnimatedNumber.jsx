// components/AnimatedNumber.jsx
"use client"
import { useState, useEffect } from "react"

const AnimatedNumber = ({ targetValue, duration = 2000, prefix = "£" }) => {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    let startTime = null
    const startValue = 0

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = startValue + (targetValue - startValue) * easeOutQuart
      
      setCurrentValue(Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [targetValue, duration])

  return (
    <span className="animated-number">
      {prefix}{currentValue}
    </span>
  )
}

export default AnimatedNumber
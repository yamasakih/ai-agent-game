import { useState, useEffect, useRef } from 'react'
import { GAME_DURATION_SECONDS } from '../constants'

interface CountdownTimerProps {
  onComplete: () => void
}

export function CountdownTimer({ onComplete }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(GAME_DURATION_SECONDS)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (remaining <= 0) {
      onCompleteRef.current()
      return
    }

    const timer = setTimeout(() => {
      setRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [remaining])

  const percentage = (remaining / GAME_DURATION_SECONDS) * 100

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center text-6xl font-mono font-bold mb-3 text-white">
        {remaining}
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            remaining <= 3 ? 'bg-red-500' : 'bg-amber-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

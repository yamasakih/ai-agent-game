import { useState, useCallback, useRef, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MODEL_ORDER, COUNT_UP_MODEL_CONFIGS, DEFAULT_DURATION, MIN_DURATION, MAX_DURATION } from '../../constants'
import { generateCircles, calculateTotalCircles } from '../../utils/circleGenerator'
import { CountdownTimer } from '../../components/CountdownTimer'
import { Circle } from '../../components/Circle'
import type { CircleState } from '../../components/Circle'
import type { ModelName } from '../../constants'

function parseSelections(searchParams: URLSearchParams): Record<ModelName, number> {
  const selections: Record<ModelName, number> = { Human: 1, Opus: 0, Sonnet: 0, Haiku: 0 }
  for (const model of MODEL_ORDER) {
    const raw = parseInt(searchParams.get(model) ?? '0', 10)
    if (!Number.isNaN(raw)) {
      selections[model] = raw
    }
  }
  return selections
}

function parseDuration(searchParams: URLSearchParams): number {
  const raw = parseInt(searchParams.get('duration') ?? '', 10)
  if (Number.isNaN(raw)) return DEFAULT_DURATION
  return Math.max(MIN_DURATION, Math.min(MAX_DURATION, raw))
}

const WRONG_RESET_DELAY_MS = 400

export function CountUpGamePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const startTimeRef = useRef(0)
  const finishedRef = useRef(false)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])

  const [circles] = useState(() => {
    const selections = parseSelections(searchParams)
    const totalCount = calculateTotalCircles(selections, COUNT_UP_MODEL_CONFIGS)
    return generateCircles(totalCount)
  })

  const duration = parseDuration(searchParams)

  const [circleStates, setCircleStates] = useState<Record<number, CircleState>>(() => {
    const states: Record<number, CircleState> = {}
    for (const circle of circles) {
      states[circle.number] = 'pending'
    }
    return states
  })

  const [nextExpected, setNextExpected] = useState(1)

  const handleSuccess = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    const elapsed = Date.now() - startTimeRef.current
    navigate('/count-up/results', {
      state: { success: true, clearTime: elapsed, totalCircles: circles.length },
    })
  }, [navigate, circles.length])

  const handleTimerComplete = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    const elapsed = Date.now() - startTimeRef.current
    navigate('/count-up/results', {
      state: { success: false, clearTime: elapsed, totalCircles: circles.length, completed: nextExpected - 1 },
    })
  }, [navigate, circles.length, nextExpected])

  const handleTap = useCallback(
    (number: number) => {
      if (finishedRef.current) return

      if (number === nextExpected) {
        const newStates = { ...circleStates, [number]: 'completed' as CircleState }
        setCircleStates(newStates)
        const newNext = nextExpected + 1
        setNextExpected(newNext)

        if (newNext > circles.length) {
          handleSuccess()
        }
      } else {
        setCircleStates((prev) => ({ ...prev, [number]: 'wrong' as CircleState }))
        setTimeout(() => {
          setCircleStates((prev) => {
            if (prev[number] === 'wrong') {
              return { ...prev, [number]: 'pending' }
            }
            return prev
          })
        }, WRONG_RESET_DELAY_MS)
      }
    },
    [nextExpected, circleStates, circles.length, handleSuccess],
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="mx-auto mb-4">
        <CountdownTimer duration={duration} onComplete={handleTimerComplete} />
      </div>

      <div className="text-center text-sm text-gray-400 mb-2">
        Next: <span className="text-white font-bold text-lg">{nextExpected}</span> / {circles.length}
      </div>

      <div className="relative flex-1 w-full">
        {circles.map((circle) => (
          <Circle
            key={circle.number}
            number={circle.number}
            x={circle.x}
            y={circle.y}
            radius={circle.radius}
            state={circleStates[circle.number]}
            onTap={handleTap}
          />
        ))}
      </div>
    </div>
  )
}

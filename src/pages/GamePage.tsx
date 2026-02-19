import { useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MODEL_ORDER, MODEL_CONFIGS, DEFAULT_DURATION } from '../constants'
import type { ModelName, NumberFormat } from '../constants'
import { generateNumbers } from '../utils/numberGenerator'
import { randomFormat } from '../utils/numberFormat'
import { NumberDisplay } from '../components/NumberDisplay'
import { CountdownTimer } from '../components/CountdownTimer'

interface GeneratedNumber {
  value: number
  format: NumberFormat
  model: ModelName
  animationIndex: number
  rotation: number
  scale: number
}

function buildNumbers(searchParams: URLSearchParams): GeneratedNumber[] {
  const result: GeneratedNumber[] = []

  for (const model of MODEL_ORDER) {
    const count = parseInt(searchParams.get(model) ?? '0', 10)
    const config = MODEL_CONFIGS[model]
    const values = generateNumbers(count, config.min, config.max)

    for (const value of values) {
      result.push({
        value,
        format: randomFormat(),
        model,
        animationIndex: Math.floor(Math.random() * 4),
        rotation: Math.floor(Math.random() * 30) - 15,
        scale: 0.8 + Math.random() * 0.8,
      })
    }
  }

  // シャッフル
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

export function GamePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [numbers] = useState(() => buildNumbers(searchParams))

  const handleTimerComplete = useCallback(() => {
    const data = numbers.map((n) => ({
      value: n.value,
      model: n.model,
    }))
    navigate('/results', { state: { numbers: data } })
  }, [numbers, navigate])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <CountdownTimer duration={DEFAULT_DURATION} onComplete={handleTimerComplete} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 max-w-2xl">
        {numbers.map((num, index) => (
          <NumberDisplay
            key={index}
            value={num.value}
            format={num.format}
            colorClass={MODEL_CONFIGS[num.model].textColor}
            animationDelay={index}
            animationIndex={num.animationIndex}
            rotation={num.rotation}
            scale={num.scale}
          />
        ))}
      </div>
    </div>
  )
}

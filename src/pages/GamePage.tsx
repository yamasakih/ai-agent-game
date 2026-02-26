import { useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MODEL_ORDER, MODEL_CONFIGS, DEFAULT_DURATION, MIN_DURATION, MAX_DURATION } from '../constants'
import type { ModelName, NumberFormat } from '../constants'
import { generateNumbers } from '../utils/numberGenerator'
import { randomFormat } from '../utils/numberFormat'
import { generateRandomColor } from '../utils/colorGenerator'
import { NumberDisplay } from '../components/NumberDisplay'
import { CountdownTimer } from '../components/CountdownTimer'

interface GeneratedNumber {
  value: number
  format: NumberFormat
  model: ModelName
  animationIndex: number
  rotation: number
  scale: number
  x: number
  y: number
  color: string
}

function generateGridPositions(count: number): { x: number; y: number }[] {
  if (count === 0) return []

  const cols = Math.ceil(Math.sqrt(count))
  const rows = Math.ceil(count / cols)

  const cellW = 80 / cols
  const cellH = 80 / rows
  const jitterX = cellW * 0.3
  const jitterY = cellH * 0.3

  const positions: { x: number; y: number }[] = []
  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    positions.push({
      x: 5 + col * cellW + cellW / 2 - jitterX + Math.random() * jitterX * 2,
      y: 5 + row * cellH + cellH / 2 - jitterY + Math.random() * jitterY * 2,
    })
  }

  return positions
}

function buildNumbers(searchParams: URLSearchParams): GeneratedNumber[] {
  const items: Omit<GeneratedNumber, 'x' | 'y'>[] = []

  for (const model of MODEL_ORDER) {
    const count = parseInt(searchParams.get(model) ?? '0', 10)
    const config = MODEL_CONFIGS[model]
    const values = generateNumbers(count, config.min, config.max)

    for (const value of values) {
      items.push({
        value,
        format: randomFormat(),
        model,
        animationIndex: Math.floor(Math.random() * 4),
        rotation: Math.floor(Math.random() * 30) - 15,
        scale: 0.8 + Math.random() * 0.8,
        color: generateRandomColor(),
      })
    }
  }

  // シャッフル
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }

  const positions = generateGridPositions(items.length)

  return items.map((item, i) => ({
    ...item,
    x: positions[i].x,
    y: positions[i].y,
  }))
}

function parseDuration(searchParams: URLSearchParams): number {
  const raw = parseInt(searchParams.get('duration') ?? '', 10)
  if (Number.isNaN(raw)) return DEFAULT_DURATION
  return Math.max(MIN_DURATION, Math.min(MAX_DURATION, raw))
}

export function GamePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [numbers] = useState(() => buildNumbers(searchParams))
  const duration = parseDuration(searchParams)

  const handleTimerComplete = useCallback(() => {
    const data = numbers.map((n) => ({
      value: n.value,
      model: n.model,
    }))
    navigate('/number-reading/results', { state: { numbers: data } })
  }, [numbers, navigate])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="mx-auto mb-4">
        <CountdownTimer duration={duration} onComplete={handleTimerComplete} />
      </div>

      <div className="relative flex-1 w-full">
        {numbers.map((num, index) => (
          <NumberDisplay
            key={index}
            value={num.value}
            format={num.format}
            color={num.color}
            x={num.x}
            y={num.y}
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

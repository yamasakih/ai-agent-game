import type { NumberFormat } from '../constants'
import { formatNumber } from '../utils/numberFormat'

const ANIMATIONS = [
  'animate-blink',
  'animate-wobble',
  'animate-spin-slow',
  'animate-drift',
]

interface NumberDisplayProps {
  value: number
  format: NumberFormat
  color: string
  x: number
  y: number
  animationDelay: number
  animationIndex: number
  rotation: number
  scale: number
}

export function NumberDisplay({
  value,
  format,
  color,
  x,
  y,
  animationDelay,
  animationIndex,
  rotation,
  scale,
}: NumberDisplayProps) {
  const displayText = formatNumber(value, format)
  const animation = ANIMATIONS[animationIndex % ANIMATIONS.length]

  return (
    <div
      className={`${animation} font-bold select-none absolute`}
      style={{
        color,
        fontSize: `${1.5 + scale}rem`,
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${animationDelay * 0.2}s`,
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      {displayText}
    </div>
  )
}

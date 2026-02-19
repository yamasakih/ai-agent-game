import { useMemo } from 'react'
import type { NumberFormat } from '../constants'
import { formatNumber } from '../utils/numberFormat'

interface NumberDisplayProps {
  value: number
  format: NumberFormat
  colorClass: string
  animationDelay: number
}

function randomAnimation(): string {
  const animations = [
    'animate-blink',
    'animate-wobble',
    'animate-spin-slow',
    'animate-drift',
  ]
  return animations[Math.floor(Math.random() * animations.length)]
}

export function NumberDisplay({
  value,
  format,
  colorClass,
  animationDelay,
}: NumberDisplayProps) {
  const animation = useMemo(() => randomAnimation(), [])
  const displayText = formatNumber(value, format)

  const randomRotation = useMemo(
    () => Math.floor(Math.random() * 30) - 15,
    [],
  )
  const randomScale = useMemo(() => 0.8 + Math.random() * 0.8, [])

  return (
    <div
      className={`${animation} ${colorClass} font-bold select-none`}
      style={{
        fontSize: `${1.5 + randomScale}rem`,
        transform: `rotate(${randomRotation}deg)`,
        animationDelay: `${animationDelay * 0.2}s`,
      }}
    >
      {displayText}
    </div>
  )
}

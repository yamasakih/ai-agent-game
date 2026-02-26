import type { DiceType } from '../../constants'

interface DicePolyhedronProps {
  value: number
  diceType: DiceType
  size: number
  color: string
  isRolling: boolean
  animationKey: number
}

const CLIP_PATHS: Record<DiceType, string> = {
  d8: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  d10: 'polygon(50% 0%, 90% 35%, 80% 90%, 20% 90%, 10% 35%)',
  d20: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
  d6: 'none', // d6 uses DiceCube, not this component
}

const GRADIENTS: Record<string, (color: string) => string> = {
  d8: (c) => `linear-gradient(135deg, ${c} 0%, ${adjustBrightness(c, -30)} 100%)`,
  d10: (c) => `linear-gradient(160deg, ${adjustBrightness(c, 20)} 0%, ${c} 50%, ${adjustBrightness(c, -25)} 100%)`,
  d20: (c) => `linear-gradient(150deg, ${adjustBrightness(c, 15)} 0%, ${c} 40%, ${adjustBrightness(c, -30)} 100%)`,
}

function adjustBrightness(hex: string, amount: number): string {
  const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16) + amount))
  const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16) + amount))
  const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16) + amount))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function DicePolyhedron({
  value,
  diceType,
  size,
  color,
  isRolling,
  animationKey,
}: DicePolyhedronProps) {
  const clipPath = CLIP_PATHS[diceType]
  const gradient = GRADIENTS[diceType]?.(color) ?? color

  return (
    <div
      key={animationKey}
      className={isRolling ? 'animate-dice-spin-poly' : 'animate-dice-land'}
      style={{ width: size, height: size }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: size,
          height: size,
          clipPath,
          background: gradient,
          filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.4))`,
        }}
      >
        <span
          className="font-bold text-white relative"
          style={{
            fontSize: size * 0.32,
            textShadow: '0 1px 3px rgba(0,0,0,0.6)',
          }}
        >
          {isRolling ? '?' : value}
        </span>
      </div>
    </div>
  )
}

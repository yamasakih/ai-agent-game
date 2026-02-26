export type CircleState = 'pending' | 'completed' | 'wrong'

interface CircleProps {
  number: number
  x: number
  y: number
  radius: number
  color: string
  zIndex: number
  state: CircleState
  onTap: (number: number) => void
}

export function Circle({ number, x, y, radius, color, zIndex, state, onTap }: CircleProps) {
  if (state === 'completed') return null

  const isWrong = state === 'wrong'

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex,
      }}
    >
      <div className={isWrong ? 'animate-shake' : ''}>
        <button
          onClick={() => onTap(number)}
          className={`rounded-full flex items-center justify-center font-bold text-white select-none transition-all duration-200 border-2 border-white/20 ${
            isWrong
              ? 'cursor-pointer'
              : 'cursor-pointer shadow-lg hover:shadow-xl active:scale-95 hover:brightness-110'
          }`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            fontSize: `${radius * 0.6}px`,
            backgroundColor: isWrong ? '#ef4444' : color,
          }}
        >
          {number}
        </button>
      </div>
    </div>
  )
}

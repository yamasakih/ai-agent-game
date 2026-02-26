export type CircleState = 'pending' | 'completed' | 'wrong'

interface CircleProps {
  number: number
  x: number
  y: number
  radius: number
  color: string
  state: CircleState
  onTap: (number: number) => void
}

export function Circle({ number, x, y, radius, color, state, onTap }: CircleProps) {
  const isCompleted = state === 'completed'
  const isWrong = state === 'wrong'

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className={isWrong ? 'animate-shake' : ''}>
        <button
          onClick={() => onTap(number)}
          disabled={isCompleted}
          className={`rounded-full flex items-center justify-center font-bold text-white select-none transition-all duration-200 ${
            isCompleted
              ? 'opacity-40 cursor-default'
              : isWrong
                ? 'cursor-pointer'
                : 'cursor-pointer shadow-lg hover:shadow-xl active:scale-95 hover:brightness-110'
          }`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            fontSize: `${radius * 0.6}px`,
            backgroundColor: isCompleted ? '#16a34a' : isWrong ? '#ef4444' : color,
          }}
        >
          {isCompleted ? '✓' : number}
        </button>
      </div>
    </div>
  )
}

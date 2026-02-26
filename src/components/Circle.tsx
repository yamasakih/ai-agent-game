export type CircleState = 'pending' | 'completed' | 'wrong'

interface CircleProps {
  number: number
  x: number
  y: number
  radius: number
  state: CircleState
  onTap: (number: number) => void
}

export function Circle({ number, x, y, radius, state, onTap }: CircleProps) {
  const isPending = state === 'pending'
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
              ? 'bg-green-600 opacity-40 cursor-default'
              : isPending
                ? 'bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-lg hover:shadow-xl active:scale-95'
                : 'bg-red-500 cursor-pointer'
          }`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            fontSize: `${radius * 0.6}px`,
          }}
        >
          {isCompleted ? '✓' : number}
        </button>
      </div>
    </div>
  )
}

import type { ModelConfig, CountUpModelConfig, DiceRollModelConfig } from '../constants'

interface ModelRowProps {
  config: ModelConfig | CountUpModelConfig | DiceRollModelConfig
  selectedCount: number
  onSelect: (count: number) => void
}

export function ModelRow({ config, selectedCount, onSelect }: ModelRowProps) {
  const counts = Array.from(
    { length: config.maxCount - config.minCount + 1 },
    (_, i) => i + config.minCount,
  )

  return (
    <div className="flex items-center gap-2">
      <span className={`w-16 text-sm font-bold ${config.textColor}`}>
        {config.name}
      </span>
      <div className="flex gap-1">
        {counts.map((count) => (
          <button
            key={count}
            onClick={() => onSelect(count)}
            className={`w-8 h-8 rounded-md text-sm font-semibold transition-all duration-150 ${
              selectedCount === count
                ? `${config.color} text-white shadow-lg scale-110`
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  )
}

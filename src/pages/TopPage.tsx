import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MODEL_ORDER, MODEL_CONFIGS, DEFAULT_DURATION, MIN_DURATION, MAX_DURATION } from '../constants'
import type { ModelName } from '../constants'
import { ModelRow } from '../components/ModelRow'

export function TopPage() {
  const navigate = useNavigate()
  const [selections, setSelections] = useState<Record<ModelName, number>>({
    Human: 1,
    Opus: 0,
    Sonnet: 0,
    Haiku: 0,
  })
  const [duration, setDuration] = useState(DEFAULT_DURATION)

  const handleSelect = (model: ModelName, count: number) => {
    setSelections((prev) => ({ ...prev, [model]: count }))
  }

  const hasAtLeastOneModel =
    selections.Opus > 0 || selections.Sonnet > 0 || selections.Haiku > 0

  const handleStart = () => {
    const params = new URLSearchParams()
    for (const model of MODEL_ORDER) {
      params.set(model, String(selections[model]))
    }
    params.set('duration', String(duration))
    navigate(`/number-reading/game?${params.toString()}`)
  }

  return (
    <div className="min-h-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Number Challenge</h1>
      <div className="flex flex-col gap-4 mb-8">
        {MODEL_ORDER.map((model) => (
          <ModelRow
            key={model}
            config={MODEL_CONFIGS[model]}
            selectedCount={selections[model]}
            onSelect={(count) => handleSelect(model, count)}
          />
        ))}
      </div>

      <div className="mb-8 w-full max-w-xs">
        <label className="block text-sm font-bold text-gray-300 mb-2 text-center">
          Time Limit: {duration}s
        </label>
        <input
          type="range"
          min={MIN_DURATION}
          max={MAX_DURATION}
          step={1}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full accent-amber-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{MIN_DURATION}s</span>
          <span>{MAX_DURATION}s</span>
        </div>
      </div>

      <button
        onClick={handleStart}
        disabled={!hasAtLeastOneModel}
        className={`px-8 py-3 rounded-xl text-lg font-bold transition-all duration-200 ${
          hasAtLeastOneModel
            ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg hover:shadow-xl cursor-pointer'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        Start
      </button>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MODEL_ORDER, DICE_ROLL_MODEL_CONFIGS } from '../../constants'
import type { ModelName } from '../../constants'
import { ModelRow } from '../../components/ModelRow'

const DICE_LABELS: Record<string, string> = {
  Human: 'd10 (10面)',
  Opus: 'd20 (20面)',
  Sonnet: 'd8 (8面)',
  Haiku: 'd6 (6面)',
}

export function DiceRollSetupPage() {
  const navigate = useNavigate()
  const [selections, setSelections] = useState<Record<ModelName, number>>({
    Human: 0,
    Opus: 0,
    Sonnet: 0,
    Haiku: 0,
  })

  const handleSelect = (model: ModelName, count: number) => {
    setSelections((prev) => ({ ...prev, [model]: count }))
  }

  const totalDice = Object.values(selections).reduce((sum, v) => sum + v, 0)

  const handleStart = () => {
    const params = new URLSearchParams()
    for (const model of MODEL_ORDER) {
      params.set(model, String(selections[model]))
    }
    navigate(`/dice-roll/game?${params.toString()}`)
  }

  return (
    <div className="min-h-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4">Dice Roll</h1>
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-2">
          {MODEL_ORDER.map((model) => (
            <ModelRow
              key={model}
              config={DICE_ROLL_MODEL_CONFIGS[model]}
              selectedCount={selections[model]}
              onSelect={(count) => handleSelect(model, count)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-gray-400 space-y-1">
            {MODEL_ORDER.map((model) => (
              <div key={model} className="flex items-center gap-2">
                <span className={`font-bold ${DICE_ROLL_MODEL_CONFIGS[model].textColor}`}>
                  {model}
                </span>
                <span className="text-gray-500">—</span>
                <span>{DICE_LABELS[model]}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleStart}
            disabled={totalDice < 1}
            className={`px-8 py-2 rounded-xl text-lg font-bold transition-all duration-200 ${
              totalDice >= 1
                ? 'bg-red-500 hover:bg-red-400 text-white shadow-lg hover:shadow-xl cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

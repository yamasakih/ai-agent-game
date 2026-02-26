import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MODEL_ORDER, DICE_ROLL_MODEL_CONFIGS } from '../../constants'
import type { ModelName } from '../../constants'
import { rollAllDice, calculateTotal } from '../../utils/diceRoller'
import type { DiceResult } from '../../utils/diceRoller'
import { DiceGroup } from '../../components/dice/DiceGroup'

function parseSelections(searchParams: URLSearchParams): Record<ModelName, number> {
  const selections: Record<ModelName, number> = { Human: 0, Opus: 0, Sonnet: 0, Haiku: 0 }
  for (const model of MODEL_ORDER) {
    const raw = parseInt(searchParams.get(model) ?? '0', 10)
    if (!Number.isNaN(raw)) {
      selections[model] = raw
    }
  }
  return selections
}

export function DiceRollGamePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selections] = useState(() => parseSelections(searchParams))
  const [results, setResults] = useState<DiceResult[]>(() =>
    rollAllDice(selections, DICE_ROLL_MODEL_CONFIGS),
  )
  const [isRolling, setIsRolling] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  const rollTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    rollTimerRef.current = setTimeout(() => setIsRolling(false), 800)
    return () => {
      if (rollTimerRef.current) clearTimeout(rollTimerRef.current)
    }
  }, [])

  const handleRoll = useCallback(() => {
    if (rollTimerRef.current) clearTimeout(rollTimerRef.current)
    setIsRolling(true)
    setAnimationKey((k) => k + 1)
    setResults(rollAllDice(selections, DICE_ROLL_MODEL_CONFIGS))
    rollTimerRef.current = setTimeout(() => setIsRolling(false), 800)
  }, [selections])

  const total = calculateTotal(results)

  const totalDice = results.length
  const diceSize = totalDice <= 4 ? 64 : totalDice <= 8 ? 56 : totalDice <= 12 ? 48 : 40

  const groupedResults: { model: ModelName; dice: DiceResult[] }[] = MODEL_ORDER.filter(
    (m) => selections[m] > 0,
  ).map((model) => ({
    model,
    dice: results.filter((r) => r.model === model),
  }))

  return (
    <div className="min-h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <button
          onClick={() => navigate('/dice-roll')}
          className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          Home
        </button>
        <h1 className="text-lg font-bold">Dice Roll</h1>
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className={`px-4 py-1 rounded-lg text-sm font-bold transition-all duration-200 ${
            isRolling
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-400 text-white cursor-pointer'
          }`}
        >
          Roll!
        </button>
      </div>

      {/* Dice area */}
      <div className="flex-1 flex flex-wrap items-start justify-center gap-6 p-4 overflow-auto">
        {groupedResults.map(({ model, dice }) => (
          <DiceGroup
            key={model}
            model={model}
            dice={dice}
            diceSize={diceSize}
            isRolling={isRolling}
            animationKey={animationKey}
          />
        ))}
      </div>

      {/* Total */}
      <div className="text-center py-3 border-t border-gray-800">
        <span className="text-gray-400 text-sm">Total: </span>
        <span className="text-2xl font-bold">{total}</span>
      </div>
    </div>
  )
}

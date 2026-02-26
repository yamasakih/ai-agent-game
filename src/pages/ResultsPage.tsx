import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { MODEL_ORDER, MODEL_CONFIGS } from '../constants'
import type { ModelName } from '../constants'

interface ResultNumber {
  value: number
  model: ModelName
}

const MODEL_NAMES = new Set<string>(MODEL_ORDER)

function isResultNumber(item: unknown): item is ResultNumber {
  if (typeof item !== 'object' || item === null) return false
  const obj = item as Record<string, unknown>
  return (
    typeof obj.value === 'number' &&
    typeof obj.model === 'string' &&
    MODEL_NAMES.has(obj.model)
  )
}

function parseNumbers(state: unknown): ResultNumber[] | null {
  if (typeof state !== 'object' || state === null) return null
  const obj = state as Record<string, unknown>
  if (!Array.isArray(obj.numbers)) return null
  if (!obj.numbers.every(isResultNumber)) return null
  return obj.numbers
}

export function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const numbers = parseNumbers(location.state)

  if (numbers === null) {
    return <Navigate to="/number-reading" replace />
  }

  const grouped = MODEL_ORDER.map((model) => ({
    model,
    config: MODEL_CONFIGS[model],
    values: numbers
      .filter((n) => n.model === model)
      .map((n) => n.value)
      .sort((a, b) => a - b),
  })).filter((group) => group.values.length > 0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Results</h1>

      <div className="flex flex-col gap-6 mb-8 w-full max-w-md">
        {grouped.map(({ model, config, values }) => (
          <div key={model}>
            <div className={`text-sm font-bold mb-2 ${config.textColor}`}>
              {model}
            </div>
            <div className="flex flex-wrap gap-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`${config.color} text-white text-2xl font-bold w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 rounded-xl text-lg font-bold bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 cursor-pointer"
      >
        Home
      </button>
    </div>
  )
}

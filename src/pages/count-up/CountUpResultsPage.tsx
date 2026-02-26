import { Navigate, useLocation, useNavigate } from 'react-router-dom'

interface CountUpResult {
  success: boolean
  clearTime: number
  totalCircles: number
  completed?: number
}

function parseResult(state: unknown): CountUpResult | null {
  if (typeof state !== 'object' || state === null) return null
  const obj = state as Record<string, unknown>
  if (typeof obj.success !== 'boolean') return null
  if (typeof obj.clearTime !== 'number') return null
  if (typeof obj.totalCircles !== 'number') return null
  return {
    success: obj.success,
    clearTime: obj.clearTime,
    totalCircles: obj.totalCircles,
    completed: typeof obj.completed === 'number' ? obj.completed : undefined,
  }
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const millis = Math.floor((ms % 1000) / 10)
  return `${seconds}.${String(millis).padStart(2, '0')}s`
}

export function CountUpResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = parseResult(location.state)

  if (result === null) {
    return <Navigate to="/count-up" replace />
  }

  return (
    <div className="min-h-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {result.success ? (
        <>
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2 text-green-400">Clear!</h1>
          <p className="text-gray-400 mb-6">
            {result.totalCircles}個の円を全てタップしました
          </p>
          <div className="text-5xl font-mono font-bold text-cyan-400 mb-8">
            {formatTime(result.clearTime)}
          </div>
        </>
      ) : (
        <>
          <div className="text-6xl mb-4">⏰</div>
          <h1 className="text-3xl font-bold mb-2 text-red-400">Time Up!</h1>
          <p className="text-gray-400 mb-8">
            {result.completed ?? 0} / {result.totalCircles} 完了
          </p>
        </>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 rounded-xl text-lg font-bold bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 rounded-xl text-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 cursor-pointer shadow-lg"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

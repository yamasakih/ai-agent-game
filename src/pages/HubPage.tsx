import { useNavigate } from 'react-router-dom'

const GAMES = [
  {
    title: 'Number Reading',
    description: '数字を読み取れ！漢数字・ローマ数字・アラビア数字が飛び交う中、正確に読み取ろう',
    path: '/number-reading',
    icon: '🔢',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Count Up',
    description: '番号順にタップ！散らばった円を1から順番に素早くタップしよう',
    path: '/count-up',
    icon: '⏱',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Dice Roll',
    description: '多面体ダイスを振れ！d6〜d20のダイスをモデル別に振って合計値を出そう',
    path: '/dice-roll',
    icon: '🎲',
    color: 'from-red-500 to-rose-600',
  },
] as const

export function HubPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2">Board Game Challenge</h1>
      <p className="text-gray-400 mb-10">ゲームを選んでチャレンジ！</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
        {GAMES.map((game) => (
          <button
            key={game.path}
            onClick={() => navigate(game.path)}
            className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer bg-gray-800 border border-gray-700 hover:border-gray-500"
          >
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${game.color}`} />
            <div className="relative">
              <div className="text-4xl mb-3">{game.icon}</div>
              <h2 className="text-xl font-bold mb-2">{game.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{game.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

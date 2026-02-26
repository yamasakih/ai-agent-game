import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HubPage } from './pages/HubPage'
import { TopPage } from './pages/TopPage'
import { GamePage } from './pages/GamePage'
import { ResultsPage } from './pages/ResultsPage'
import { CountUpSetupPage } from './pages/count-up/CountUpSetupPage'
import { CountUpGamePage } from './pages/count-up/CountUpGamePage'
import { CountUpResultsPage } from './pages/count-up/CountUpResultsPage'

function App() {
  return (
    <div className="h-screen w-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full h-full max-w-[844px] max-h-[430px] overflow-auto relative rounded-2xl border border-gray-800 shadow-2xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HubPage />} />
            <Route path="/number-reading" element={<TopPage />} />
            <Route path="/number-reading/game" element={<GamePage />} />
            <Route path="/number-reading/results" element={<ResultsPage />} />
            <Route path="/count-up" element={<CountUpSetupPage />} />
            <Route path="/count-up/game" element={<CountUpGamePage />} />
            <Route path="/count-up/results" element={<CountUpResultsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App

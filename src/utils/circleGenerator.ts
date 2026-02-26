import type { CountUpModelConfig, ModelName } from '../constants'

export interface CircleData {
  number: number
  x: number
  y: number
  radius: number
}

const MIN_RADIUS = 24
const MAX_RADIUS = 48
const POSITION_MIN = -10
const POSITION_MAX = 110
const CANDIDATE_COUNT = 20

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function findBestPosition(existing: CircleData[]): { x: number; y: number } {
  if (existing.length === 0) {
    return { x: randomInRange(POSITION_MIN, POSITION_MAX), y: randomInRange(POSITION_MIN, POSITION_MAX) }
  }

  let bestCandidate = { x: 0, y: 0 }
  let bestMinDistance = -1

  for (let i = 0; i < CANDIDATE_COUNT; i++) {
    const x = randomInRange(POSITION_MIN, POSITION_MAX)
    const y = randomInRange(POSITION_MIN, POSITION_MAX)

    const minDist = Math.min(...existing.map((c) => distance(x, y, c.x, c.y)))

    if (minDist > bestMinDistance) {
      bestMinDistance = minDist
      bestCandidate = { x, y }
    }
  }

  return bestCandidate
}

export function generateCircles(totalCount: number): CircleData[] {
  const circles: CircleData[] = []

  for (let i = 0; i < totalCount; i++) {
    const { x, y } = findBestPosition(circles)
    circles.push({
      number: i + 1,
      x,
      y,
      radius: randomInRange(MIN_RADIUS, MAX_RADIUS),
    })
  }

  return circles
}

export function calculateTotalCircles(
  selections: Record<ModelName, number>,
  configs: Record<ModelName, CountUpModelConfig>,
): number {
  let total = 0

  for (const model of Object.keys(selections) as ModelName[]) {
    const count = selections[model]
    const config = configs[model]

    for (let i = 0; i < count; i++) {
      total += Math.floor(randomInRange(config.addMin, config.addMax + 1))
    }
  }

  return total
}

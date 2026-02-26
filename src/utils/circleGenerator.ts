import type { CountUpModelConfig, ModelName } from '../constants'
import { generateRandomColor } from './colorGenerator'

export interface CircleData {
  number: number
  x: number
  y: number
  radius: number
  color: string
}

export interface ExclusionZone {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

const MIN_RADIUS = 20
const MAX_RADIUS = 56
// 円の数字が読めるよう端から少しマージンを確保
const POSITION_X_MIN = 3
const POSITION_X_MAX = 97
const POSITION_Y_MIN = 6
const POSITION_Y_MAX = 94
const CANDIDATE_COUNT = 6

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function isInExclusionZone(x: number, y: number, zones: ExclusionZone[]): boolean {
  return zones.some((z) => x >= z.xMin && x <= z.xMax && y >= z.yMin && y <= z.yMax)
}

function findBestPosition(
  existing: CircleData[],
  exclusionZones: ExclusionZone[],
): { x: number; y: number } {
  let bestCandidate = { x: 0, y: 0 }
  let bestMinDistance = -1

  for (let i = 0; i < CANDIDATE_COUNT; i++) {
    const x = randomInRange(POSITION_X_MIN, POSITION_X_MAX)
    const y = randomInRange(POSITION_Y_MIN, POSITION_Y_MAX)

    if (isInExclusionZone(x, y, exclusionZones)) continue

    const minDist =
      existing.length === 0
        ? Infinity
        : Math.min(...existing.map((c) => distance(x, y, c.x, c.y)))

    if (minDist > bestMinDistance) {
      bestMinDistance = minDist
      bestCandidate = { x, y }
    }
  }

  return bestCandidate
}

export function generateCircles(
  totalCount: number,
  exclusionZones: ExclusionZone[] = [],
): CircleData[] {
  const circles: CircleData[] = []

  for (let i = 0; i < totalCount; i++) {
    const { x, y } = findBestPosition(circles, exclusionZones)
    circles.push({
      number: i + 1,
      x,
      y,
      radius: randomInRange(MIN_RADIUS, MAX_RADIUS),
      color: generateRandomColor(),
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

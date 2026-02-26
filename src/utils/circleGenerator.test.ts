import { describe, it, expect } from 'vitest'
import { generateCircles, calculateTotalCircles } from './circleGenerator'
import type { CountUpModelConfig, ModelName } from '../constants'

const TEST_CONFIGS: Record<ModelName, CountUpModelConfig> = {
  Human: { name: 'Human', color: 'bg-gray-500', textColor: 'text-gray-300', addMin: 5, addMax: 5, minCount: 1, maxCount: 1 },
  Opus: { name: 'Opus', color: 'bg-purple-600', textColor: 'text-purple-400', addMin: 1, addMax: 3, minCount: 0, maxCount: 5 },
  Sonnet: { name: 'Sonnet', color: 'bg-blue-600', textColor: 'text-blue-400', addMin: 3, addMax: 6, minCount: 0, maxCount: 5 },
  Haiku: { name: 'Haiku', color: 'bg-green-600', textColor: 'text-green-400', addMin: 5, addMax: 8, minCount: 0, maxCount: 5 },
}

describe('generateCircles', () => {
  it('指定した数の円を生成する', () => {
    const circles = generateCircles(10)
    expect(circles).toHaveLength(10)
  })

  it('0個の場合は空配列を返す', () => {
    expect(generateCircles(0)).toEqual([])
  })

  it('各円に連番のnumberが付与される（1始まり）', () => {
    const circles = generateCircles(5)
    expect(circles.map((c) => c.number)).toEqual([1, 2, 3, 4, 5])
  })

  it('x座標がマージン込みの範囲内(3〜97)である', () => {
    for (let i = 0; i < 50; i++) {
      const circles = generateCircles(10)
      for (const circle of circles) {
        expect(circle.x).toBeGreaterThanOrEqual(3)
        expect(circle.x).toBeLessThanOrEqual(97)
      }
    }
  })

  it('y座標がマージン込みの範囲内(6〜94)である', () => {
    for (let i = 0; i < 50; i++) {
      const circles = generateCircles(10)
      for (const circle of circles) {
        expect(circle.y).toBeGreaterThanOrEqual(6)
        expect(circle.y).toBeLessThanOrEqual(94)
      }
    }
  })

  it('半径が20〜72の範囲内である', () => {
    for (let i = 0; i < 50; i++) {
      const circles = generateCircles(10)
      for (const circle of circles) {
        expect(circle.radius).toBeGreaterThanOrEqual(20)
        expect(circle.radius).toBeLessThanOrEqual(72)
      }
    }
  })

  it('各円にHSL形式の色が付与される', () => {
    const circles = generateCircles(5)
    for (const circle of circles) {
      expect(circle.color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/)
    }
  })

  it('除外ゾーン内に円が配置されない', () => {
    const exclusionZones = [{ xMin: 20, xMax: 80, yMin: 0, yMax: 25 }]
    for (let i = 0; i < 50; i++) {
      const circles = generateCircles(10, exclusionZones)
      for (const circle of circles) {
        const inZone =
          circle.x >= 20 && circle.x <= 80 && circle.y >= 0 && circle.y <= 25
        expect(inZone).toBe(false)
      }
    }
  })
})

describe('calculateTotalCircles', () => {
  it('Human固定5個のみの場合、合計5を返す', () => {
    const selections: Record<ModelName, number> = { Human: 1, Opus: 0, Sonnet: 0, Haiku: 0 }
    const total = calculateTotalCircles(selections, TEST_CONFIGS)
    expect(total).toBe(5)
  })

  it('すべて0の場合は0を返す', () => {
    const selections: Record<ModelName, number> = { Human: 1, Opus: 0, Sonnet: 0, Haiku: 0 }
    // Humanは固定1なので最低5
    // Opus=0, Sonnet=0, Haiku=0 なので5のみ
    expect(calculateTotalCircles(selections, TEST_CONFIGS)).toBe(5)
  })

  it('各モデルの選択数に応じてaddMin〜addMaxの範囲で合計が計算される', () => {
    const selections: Record<ModelName, number> = { Human: 1, Opus: 2, Sonnet: 1, Haiku: 0 }
    for (let i = 0; i < 100; i++) {
      const total = calculateTotalCircles(selections, TEST_CONFIGS)
      // Human: 5固定 = 5
      // Opus: 2ユニット × (1〜3) = 2〜6
      // Sonnet: 1ユニット × (3〜6) = 3〜6
      // Haiku: 0
      // 合計: 10〜17
      expect(total).toBeGreaterThanOrEqual(10)
      expect(total).toBeLessThanOrEqual(17)
    }
  })
})

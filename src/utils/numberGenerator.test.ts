import { describe, it, expect } from 'vitest'
import { generateNumber, generateNumbers } from './numberGenerator'

describe('generateNumber', () => {
  it('指定範囲内の数字を生成する', () => {
    for (let i = 0; i < 100; i++) {
      const num = generateNumber(3, 9)
      expect(num).toBeGreaterThanOrEqual(3)
      expect(num).toBeLessThanOrEqual(9)
    }
  })

  it('min === max のとき常にその値を返す', () => {
    for (let i = 0; i < 10; i++) {
      expect(generateNumber(5, 5)).toBe(5)
    }
  })
})

describe('generateNumbers', () => {
  it('指定個数の数字を生成する', () => {
    const numbers = generateNumbers(3, 1, 6)
    expect(numbers).toHaveLength(3)
    numbers.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(6)
    })
  })

  it('0個の場合は空配列を返す', () => {
    expect(generateNumbers(0, 1, 6)).toEqual([])
  })
})

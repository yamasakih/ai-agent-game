import { describe, it, expect } from 'vitest'
import { generateRandomColor } from './colorGenerator'

describe('generateRandomColor', () => {
  it('HSL形式の文字列を返す', () => {
    const color = generateRandomColor()
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/)
  })

  it('明度が50〜80%の範囲である', () => {
    for (let i = 0; i < 100; i++) {
      const color = generateRandomColor()
      const lightness = parseInt(color.match(/(\d+)%\)$/)![1], 10)
      expect(lightness).toBeGreaterThanOrEqual(50)
      expect(lightness).toBeLessThanOrEqual(80)
    }
  })

  it('彩度が60〜100%の範囲である', () => {
    for (let i = 0; i < 100; i++) {
      const color = generateRandomColor()
      const saturation = parseInt(color.match(/, (\d+)%,/)![1], 10)
      expect(saturation).toBeGreaterThanOrEqual(60)
      expect(saturation).toBeLessThanOrEqual(100)
    }
  })

  it('色相が0〜360の範囲である', () => {
    for (let i = 0; i < 100; i++) {
      const color = generateRandomColor()
      const hue = parseInt(color.match(/^hsl\((\d+)/)![1], 10)
      expect(hue).toBeGreaterThanOrEqual(0)
      expect(hue).toBeLessThanOrEqual(360)
    }
  })
})

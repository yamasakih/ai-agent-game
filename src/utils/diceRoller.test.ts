import { describe, it, expect } from 'vitest'
import { rollDie, rollAllDice, calculateTotal } from './diceRoller'
import { DICE_ROLL_MODEL_CONFIGS } from '../constants'
import type { ModelName } from '../constants'

describe('rollDie', () => {
  it('returns a value between 1 and faces (inclusive)', () => {
    for (let i = 0; i < 100; i++) {
      const result = rollDie(6)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(6)
    }
  })

  it('returns integer values', () => {
    for (let i = 0; i < 50; i++) {
      const result = rollDie(20)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('works with different face counts', () => {
    const faceCounts = [6, 8, 10, 20]
    for (const faces of faceCounts) {
      const result = rollDie(faces)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(faces)
    }
  })
})

describe('rollAllDice', () => {
  it('generates correct number of dice per model', () => {
    const selections: Record<ModelName, number> = {
      Human: 2,
      Opus: 1,
      Sonnet: 3,
      Haiku: 0,
    }

    const results = rollAllDice(selections, DICE_ROLL_MODEL_CONFIGS)

    expect(results.filter((r) => r.model === 'Human')).toHaveLength(2)
    expect(results.filter((r) => r.model === 'Opus')).toHaveLength(1)
    expect(results.filter((r) => r.model === 'Sonnet')).toHaveLength(3)
    expect(results.filter((r) => r.model === 'Haiku')).toHaveLength(0)
  })

  it('returns empty array when all selections are 0', () => {
    const selections: Record<ModelName, number> = {
      Human: 0,
      Opus: 0,
      Sonnet: 0,
      Haiku: 0,
    }

    const results = rollAllDice(selections, DICE_ROLL_MODEL_CONFIGS)
    expect(results).toHaveLength(0)
  })

  it('each result has correct diceType and value range', () => {
    const selections: Record<ModelName, number> = {
      Human: 2,
      Opus: 2,
      Sonnet: 2,
      Haiku: 2,
    }

    const results = rollAllDice(selections, DICE_ROLL_MODEL_CONFIGS)

    for (const result of results) {
      const config = DICE_ROLL_MODEL_CONFIGS[result.model]
      expect(result.diceType).toBe(config.diceType)
      expect(result.value).toBeGreaterThanOrEqual(1)
      expect(result.value).toBeLessThanOrEqual(config.faces)
    }
  })
})

describe('calculateTotal', () => {
  it('sums all dice values', () => {
    const results = [
      { model: 'Human' as ModelName, diceType: 'd10' as const, value: 5 },
      { model: 'Opus' as ModelName, diceType: 'd20' as const, value: 15 },
      { model: 'Sonnet' as ModelName, diceType: 'd8' as const, value: 3 },
    ]

    expect(calculateTotal(results)).toBe(23)
  })

  it('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })
})

import { MODEL_ORDER } from '../constants'
import type { ModelName, DiceType, DiceRollModelConfig } from '../constants'

export interface DiceResult {
  model: ModelName
  diceType: DiceType
  value: number
}

export function rollDie(faces: number): number {
  return Math.floor(Math.random() * faces) + 1
}

export function rollAllDice(
  selections: Record<ModelName, number>,
  configs: Record<ModelName, DiceRollModelConfig>,
): DiceResult[] {
  const results: DiceResult[] = []
  for (const model of MODEL_ORDER) {
    const count = selections[model]
    const config = configs[model]
    for (let i = 0; i < count; i++) {
      results.push({
        model,
        diceType: config.diceType,
        value: rollDie(config.faces),
      })
    }
  }
  return results
}

export function calculateTotal(results: DiceResult[]): number {
  return results.reduce((sum, r) => sum + r.value, 0)
}

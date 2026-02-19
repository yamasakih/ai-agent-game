export type ModelName = 'Human' | 'Opus' | 'Sonnet' | 'Haiku'

export type NumberFormat = 'kanji' | 'roman' | 'arabic'

export interface ModelConfig {
  name: ModelName
  color: string
  textColor: string
  min: number
  max: number
  minCount: number
  maxCount: number
}

export const MODEL_CONFIGS: Record<ModelName, ModelConfig> = {
  Human: {
    name: 'Human',
    color: 'bg-gray-500',
    textColor: 'text-gray-300',
    min: 8,
    max: 13,
    minCount: 1,
    maxCount: 1,
  },
  Opus: {
    name: 'Opus',
    color: 'bg-purple-600',
    textColor: 'text-purple-400',
    min: 6,
    max: 12,
    minCount: 0,
    maxCount: 5,
  },
  Sonnet: {
    name: 'Sonnet',
    color: 'bg-blue-600',
    textColor: 'text-blue-400',
    min: 3,
    max: 9,
    minCount: 0,
    maxCount: 5,
  },
  Haiku: {
    name: 'Haiku',
    color: 'bg-green-600',
    textColor: 'text-green-400',
    min: 1,
    max: 6,
    minCount: 0,
    maxCount: 5,
  },
}

export const MODEL_ORDER: ModelName[] = ['Human', 'Opus', 'Sonnet', 'Haiku']

export const GAME_DURATION_SECONDS = 10

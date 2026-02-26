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

export interface CountUpModelConfig {
  name: ModelName
  color: string
  textColor: string
  addMin: number
  addMax: number
  minCount: number
  maxCount: number
}

export const COUNT_UP_MODEL_CONFIGS: Record<ModelName, CountUpModelConfig> = {
  Human: {
    name: 'Human',
    color: 'bg-gray-500',
    textColor: 'text-gray-300',
    addMin: 5,
    addMax: 5,
    minCount: 1,
    maxCount: 1,
  },
  Opus: {
    name: 'Opus',
    color: 'bg-purple-600',
    textColor: 'text-purple-400',
    addMin: 1,
    addMax: 3,
    minCount: 0,
    maxCount: 5,
  },
  Sonnet: {
    name: 'Sonnet',
    color: 'bg-blue-600',
    textColor: 'text-blue-400',
    addMin: 3,
    addMax: 6,
    minCount: 0,
    maxCount: 5,
  },
  Haiku: {
    name: 'Haiku',
    color: 'bg-green-600',
    textColor: 'text-green-400',
    addMin: 5,
    addMax: 8,
    minCount: 0,
    maxCount: 5,
  },
}

export const DEFAULT_DURATION = 10
export const MIN_DURATION = 5
export const MAX_DURATION = 30

export type DiceType = 'd6' | 'd8' | 'd10' | 'd20'

export interface DiceRollModelConfig {
  name: ModelName
  color: string
  textColor: string
  hexColor: string
  diceType: DiceType
  faces: number
  minCount: number
  maxCount: number
}

export const DICE_ROLL_MODEL_CONFIGS: Record<ModelName, DiceRollModelConfig> = {
  Human: {
    name: 'Human',
    color: 'bg-gray-500',
    textColor: 'text-gray-300',
    hexColor: '#6b7280',
    diceType: 'd10',
    faces: 10,
    minCount: 0,
    maxCount: 5,
  },
  Opus: {
    name: 'Opus',
    color: 'bg-purple-600',
    textColor: 'text-purple-400',
    hexColor: '#9333ea',
    diceType: 'd20',
    faces: 20,
    minCount: 0,
    maxCount: 5,
  },
  Sonnet: {
    name: 'Sonnet',
    color: 'bg-blue-600',
    textColor: 'text-blue-400',
    hexColor: '#2563eb',
    diceType: 'd8',
    faces: 8,
    minCount: 0,
    maxCount: 5,
  },
  Haiku: {
    name: 'Haiku',
    color: 'bg-green-600',
    textColor: 'text-green-400',
    hexColor: '#16a34a',
    diceType: 'd6',
    faces: 6,
    minCount: 0,
    maxCount: 5,
  },
}

import type { NumberFormat } from '../constants'

const KANJI_DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

export function toKanji(n: number): string {
  if (n <= 0 || n > 13) {
    return String(n)
  }
  if (n < 10) {
    return KANJI_DIGITS[n]
  }
  if (n === 10) {
    return '十'
  }
  return '十' + KANJI_DIGITS[n - 10]
}

const ROMAN_NUMERALS: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

export function toRoman(n: number): string {
  let result = ''
  let remaining = n
  for (const [value, symbol] of ROMAN_NUMERALS) {
    while (remaining >= value) {
      result += symbol
      remaining -= value
    }
  }
  return result
}

export function formatNumber(n: number, format: NumberFormat): string {
  switch (format) {
    case 'kanji':
      return toKanji(n)
    case 'roman':
      return toRoman(n)
    case 'arabic':
      return String(n)
  }
}

const NUMBER_FORMATS: NumberFormat[] = ['kanji', 'roman', 'arabic']

export function randomFormat(): NumberFormat {
  return NUMBER_FORMATS[Math.floor(Math.random() * NUMBER_FORMATS.length)]
}

import { describe, it, expect } from 'vitest'
import { toKanji, toRoman, formatNumber } from './numberFormat'

describe('toKanji', () => {
  it('1桁の数字を漢数字に変換する', () => {
    expect(toKanji(1)).toBe('一')
    expect(toKanji(2)).toBe('二')
    expect(toKanji(3)).toBe('三')
    expect(toKanji(4)).toBe('四')
    expect(toKanji(5)).toBe('五')
    expect(toKanji(6)).toBe('六')
    expect(toKanji(7)).toBe('七')
    expect(toKanji(8)).toBe('八')
    expect(toKanji(9)).toBe('九')
  })

  it('10を漢数字に変換する', () => {
    expect(toKanji(10)).toBe('十')
  })

  it('11〜13を漢数字に変換する', () => {
    expect(toKanji(11)).toBe('十一')
    expect(toKanji(12)).toBe('十二')
    expect(toKanji(13)).toBe('十三')
  })
})

describe('toRoman', () => {
  it('1〜3をローマ数字に変換する', () => {
    expect(toRoman(1)).toBe('I')
    expect(toRoman(2)).toBe('II')
    expect(toRoman(3)).toBe('III')
  })

  it('4〜6をローマ数字に変換する', () => {
    expect(toRoman(4)).toBe('IV')
    expect(toRoman(5)).toBe('V')
    expect(toRoman(6)).toBe('VI')
  })

  it('7〜9をローマ数字に変換する', () => {
    expect(toRoman(7)).toBe('VII')
    expect(toRoman(8)).toBe('VIII')
    expect(toRoman(9)).toBe('IX')
  })

  it('10〜13をローマ数字に変換する', () => {
    expect(toRoman(10)).toBe('X')
    expect(toRoman(11)).toBe('XI')
    expect(toRoman(12)).toBe('XII')
    expect(toRoman(13)).toBe('XIII')
  })
})

describe('formatNumber', () => {
  it('漢数字形式で表示する', () => {
    expect(formatNumber(5, 'kanji')).toBe('五')
  })

  it('ローマ数字形式で表示する', () => {
    expect(formatNumber(5, 'roman')).toBe('V')
  })

  it('アラビア数字形式で表示する', () => {
    expect(formatNumber(5, 'arabic')).toBe('5')
  })
})

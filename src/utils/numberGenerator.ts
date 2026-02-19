export function generateNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateNumbers(count: number, min: number, max: number): number[] {
  return Array.from({ length: count }, () => generateNumber(min, max))
}

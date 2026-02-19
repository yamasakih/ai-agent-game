export function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 361)
  const saturation = 60 + Math.floor(Math.random() * 41)
  const lightness = 50 + Math.floor(Math.random() * 31)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

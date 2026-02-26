interface DiceCubeProps {
  value: number
  size: number
  color: string
  isRolling: boolean
  animationKey: number
}

const FACE_ROTATIONS: Record<number, { rx: number; ry: number }> = {
  1: { rx: 0, ry: 0 },
  2: { rx: 0, ry: -90 },
  3: { rx: -90, ry: 0 },
  4: { rx: 90, ry: 0 },
  5: { rx: 0, ry: 90 },
  6: { rx: 180, ry: 0 },
}

const PIP_PATTERNS: Record<number, boolean[]> = {
  1: [false, false, false, false, true, false, false, false, false],
  2: [false, false, true, false, false, false, true, false, false],
  3: [false, false, true, false, true, false, true, false, false],
  4: [true, false, true, false, false, false, true, false, true],
  5: [true, false, true, false, true, false, true, false, true],
  6: [true, false, true, true, false, true, true, false, true],
}

function PipFace({ value, size }: { value: number; size: number }) {
  const pips = PIP_PATTERNS[value]
  const pipSize = Math.max(size * 0.16, 4)

  return (
    <div
      className="grid grid-cols-3 grid-rows-3 items-center justify-items-center"
      style={{ width: size, height: size, padding: size * 0.12 }}
    >
      {pips.map((show, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: pipSize,
            height: pipSize,
            backgroundColor: show ? 'white' : 'transparent',
          }}
        />
      ))}
    </div>
  )
}

export function DiceCube({ value, size, color, isRolling, animationKey }: DiceCubeProps) {
  const half = size / 2
  const { rx, ry } = FACE_ROTATIONS[value] ?? FACE_ROTATIONS[1]

  const faceStyle = (transform: string): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color,
    borderRadius: size * 0.12,
    border: '1px solid rgba(255,255,255,0.15)',
    transform,
  })

  return (
    <div style={{ width: size, height: size, perspective: size * 4 }}>
      <div
        key={animationKey}
        className={isRolling ? 'animate-dice-tumble-3d' : 'animate-dice-land'}
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: isRolling ? 'none' : undefined,
          transform: isRolling ? undefined : `rotateX(${rx}deg) rotateY(${ry}deg)`,
          ['--land-rx' as string]: `${rx}deg`,
          ['--land-ry' as string]: `${ry}deg`,
        }}
      >
        {/* Front - 1 */}
        <div style={faceStyle(`translateZ(${half}px)`)}>
          <PipFace value={1} size={size} />
        </div>
        {/* Back - 6 */}
        <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`)}>
          <PipFace value={6} size={size} />
        </div>
        {/* Right - 5 */}
        <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`)}>
          <PipFace value={5} size={size} />
        </div>
        {/* Left - 2 */}
        <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`)}>
          <PipFace value={2} size={size} />
        </div>
        {/* Top - 3 */}
        <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`)}>
          <PipFace value={3} size={size} />
        </div>
        {/* Bottom - 4 */}
        <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`)}>
          <PipFace value={4} size={size} />
        </div>
      </div>
    </div>
  )
}

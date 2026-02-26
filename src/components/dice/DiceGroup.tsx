import { DICE_ROLL_MODEL_CONFIGS } from '../../constants'
import type { ModelName } from '../../constants'
import type { DiceResult } from '../../utils/diceRoller'
import { DiceCube } from './DiceCube'
import { DicePolyhedron } from './DicePolyhedron'

interface DiceGroupProps {
  model: ModelName
  dice: DiceResult[]
  diceSize: number
  isRolling: boolean
  animationKey: number
}

export function DiceGroup({ model, dice, diceSize, isRolling, animationKey }: DiceGroupProps) {
  const config = DICE_ROLL_MODEL_CONFIGS[model]
  const hexColor = config.hexColor

  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`text-xs font-bold ${config.textColor}`}>
        {model} ({config.diceType})
      </span>
      <div className="flex flex-wrap gap-2 justify-center">
        {dice.map((d, i) =>
          d.diceType === 'd6' ? (
            <DiceCube
              key={`${animationKey}-${i}`}
              value={d.value}
              size={diceSize}
              color={hexColor}
              isRolling={isRolling}
              animationKey={animationKey}
            />
          ) : (
            <DicePolyhedron
              key={`${animationKey}-${i}`}
              value={d.value}
              diceType={d.diceType}
              size={diceSize}
              color={hexColor}
              isRolling={isRolling}
              animationKey={animationKey}
            />
          ),
        )}
      </div>
    </div>
  )
}

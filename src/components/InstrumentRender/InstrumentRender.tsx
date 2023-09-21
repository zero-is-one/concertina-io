import { useKeyboardShortcutsPressed } from "@/hooks/useKeyboardShortcuts";
import { Button } from "./Button";
import { InstrumentSchema } from "@/types";
import { Tooltip } from "@chakra-ui/react";

export const InstrumentRender = ({
  instrumentSchema,
}: {
  instrumentSchema: InstrumentSchema;
}) => {
  const pressedKeys = useKeyboardShortcutsPressed(
    instrumentSchema.buttons.map((button) => button.shortcut)
  );

  if (!instrumentSchema) return null;

  //get min/max x and y
  const bounds = getBounds(instrumentSchema);
  const buttonUnitWidth = 4;
  const unitWidth = bounds.maxX - bounds.minX;
  const unitHeight = bounds.maxY - bounds.minY;
  const unitPercentValX = 100 / unitWidth;
  const unitPercentValY = 100 / unitHeight;

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: `${unitWidth} / ${unitHeight}`,
        width: "100%",
      }}
    >
      {instrumentSchema.buttons.map((button) => {
        const buttonUnitHeight = button.shape === "full" ? 4 : 2;
        return (
          <div
            key={button.id}
            style={{
              padding: ".15cqw .4cqw",
              position: "absolute",
              width: `${unitPercentValX * buttonUnitWidth}%`,
              height: `${unitPercentValY * buttonUnitHeight}%`,
              left: `${(button.x - bounds.minX) * unitPercentValX}%`,
              top: `${(button.y - bounds.minY) * unitPercentValY}%`,
            }}
          >
            <Tooltip hasArrow label={button.shortcut}>
              <Button
                active={pressedKeys.includes(button.shortcut)}
                shape={button.shape}
              >
                {button.label || button.note}
              </Button>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

const getBounds = (instrumentSchema: InstrumentSchema) => {
  return instrumentSchema.buttons.reduce(
    (acc, button) => {
      const width = button.shape === "full" ? 4 : 4;
      const height = button.shape === "full" ? 4 : 2;

      if (button.x < acc.minX) {
        acc.minX = button.x;
      }
      if (button.x + width > acc.maxX) {
        acc.maxX = button.x + width;
      }
      if (button.y < acc.minY) {
        acc.minY = button.y;
      }
      if (button.y + height > acc.maxY) {
        acc.maxY = button.y + height;
      }
      return acc;
    },
    { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  );
};

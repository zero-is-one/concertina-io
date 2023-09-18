import { Button } from "./Button";
import { Instrument } from "@/types";
export const InstrumentRender = ({
  instrument,
}: {
  instrument: Instrument;
}) => {
  if (!instrument) return null;

  //get min/max x and y
  const bounds = instrument.buttons.reduce(
    (acc, button) => {
      const width = button.format === "full" ? 4 : 4;
      const height = button.format === "full" ? 4 : 2;

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
      {instrument.buttons.map((button) => {
        const buttonUnitHeight = button.format === "full" ? 4 : 2;
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
            <Button format={button.format}>
              {button.label || button.note}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

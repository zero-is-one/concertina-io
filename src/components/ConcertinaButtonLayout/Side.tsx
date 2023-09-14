import { Button } from "./Button";
import { layouts } from "@/config/concertinaLayout.ts";

export const Side = ({
  layout,
  side,
}: {
  layout: string[][];
  side: "left" | "right";
}) => {
  console.log(layouts["cg-wheatstone-30"]);

  //padding on each side as percentage of width
  const offset = 5;

  return (
    <div style={{ width: "100%" }}>
      {layout.map((row, index) => {
        return (
          <div
            style={{
              display: "flex",
              width: `${100 - offset * 2}%`,
              paddingLeft:
                side === "right"
                  ? `${index * offset}%`
                  : `${(2 - index) * offset}%`,
            }}
          >
            {row.map((keyCode) => {
              const data = layouts["cg-wheatstone-30"].layout.find(
                (button) => button.key === keyCode
              );

              return (
                <Button
                  pushText={data?.push || ""}
                  pullText={data?.pull || ""}
                  keyCode={keyCode}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

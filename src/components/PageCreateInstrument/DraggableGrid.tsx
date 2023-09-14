import { GridLayout, LayoutItem } from "react-grid-layout-next";
import "/node_modules/react-grid-layout-next/css/styles.css";
import { useInstrument } from "@/hooks/useInstrument";
export const DraggableGrid = ({
  instrumentStore,
}: {
  instrumentStore: ReturnType<typeof useInstrument>;
}) => {
  const layout: LayoutItem[] = instrumentStore.instrument.buttons.map(
    (item) => {
      return {
        i: item.id,
        x: item.x,
        y: item.y,
        w: 4,
        h: 4,
        isDraggable: true,
        isResizable: false,
      };
    }
  );
  const cols = 48;
  const width = 800;
  const margin = 10;
  return (
    <GridLayout
      layout={layout}
      cols={cols}
      rowHeight={width / (cols + 1) - margin}
      width={width}
      isBounded={false}
      allowOverlap={true}
      margin={[margin, margin]}
      style={{
        transition: "height 0ms ease",
        border: "1px solid #bbb",
        minHeight: "40vh",
        width,
      }}
      onLayoutChange={(layout) => {
        const buttonsCopy = [...instrumentStore.instrument.buttons];
        layout.forEach((item) => {
          const button = buttonsCopy.find((b) => b.id === item.i);
          if (!button) return;
          button.x = item.x;
          button.y = item.y;
        });

        instrumentStore.update("buttons", buttonsCopy);
      }}
    >
      {layout.map((item) => {
        return (
          <div
            key={item.i}
            style={{
              backgroundColor: "red",
              pointerEvents: "auto",
              border: `3px solid ${
                instrumentStore.selectedButton?.id === item.i
                  ? "blue"
                  : "transparent"
              }`,
            }}
            onClick={() => {
              instrumentStore.setSelectedButton(
                instrumentStore.instrument.buttons.find((b) => b.id === item.i)
              );
            }}
          >
            <div>{item.i}</div>
          </div>
        );
      })}
    </GridLayout>
  );
};

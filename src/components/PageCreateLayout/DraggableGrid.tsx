import { GridLayout, LayoutItem } from "react-grid-layout-next";

export const DraggableGrid = () => {
  const layout: LayoutItem[] = [
    { i: "a", x: 0, y: 0, w: 4, h: 4 },
    { i: "b", x: 4, y: 0, w: 4, h: 4 },
    { i: "c", x: 4, y: 0, w: 4, h: 2 },
    { i: "d", x: 4, y: 0, w: 4, h: 2 },
  ];
  const cols = 48;
  const width = 800;
  const margin = 10;
  return (
    <GridLayout
      layout={layout.map((item) => {
        return { ...item, isDraggable: true, isResizable: false };
      })}
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
        console.log({ layout });
        //setInstrument({ ...instrument, layout });
      }}
    >
      {layout.map((item) => {
        return (
          <div
            key={item.i}
            style={{ backgroundColor: "red", pointerEvents: "auto" }}
            onClick={() => {
              console.log("item", item);
            }}
          >
            <div style={{ pointerEvents: "none" }}>{item.i}</div>
          </div>
        );
      })}
    </GridLayout>
  );
};

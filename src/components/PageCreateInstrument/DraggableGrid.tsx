import { GridLayout, LayoutItem } from "react-grid-layout-next";
import "/node_modules/react-grid-layout-next/css/styles.css";
import { useInstrument } from "@/hooks/useInstrument";
import { AbsoluteCenter, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

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
        h: item.format === "full" ? 4 : 2,
        isDraggable: true,
        isResizable: false,
      };
    }
  );
  const cols = 64;
  const width = 800;
  const marginX = 10;
  const marginY = marginX / 2;

  return (
    <DraggableGridContainer>
      <GridLayout
        layout={layout}
        cols={cols}
        rowHeight={width / (cols + 1) - marginY}
        width={width}
        isBounded={false}
        allowOverlap={true}
        margin={[marginX, marginY]}
        style={{
          transition: "height 0ms ease",
          border: "1px solid #bbb",
          minHeight: "40vh",
          width,
          backgroundColor: "white",
        }}
        onDragStop={(ev) => {
          instrumentStore.setSelectedButtonById(ev.item?.i as string);
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
          const button = instrumentStore.instrument.buttons.find(
            (b) => b.id === item.i
          );

          return (
            <Box
              key={item.i}
              background={"gray.500"}
              color={"white"}
              style={{
                pointerEvents: "auto",
                border: `3px solid ${
                  instrumentStore.selectedButton?.id === item.i
                    ? "blue"
                    : "transparent"
                }`,
                cursor: "grab",
                zIndex: "10 important!",
                position: "relative",
              }}
              onClick={() => {
                instrumentStore.setSelectedButton(
                  instrumentStore.instrument.buttons.find(
                    (b) => b.id === item.i
                  )
                );
              }}
            >
              <AbsoluteCenter style={{ userSelect: "none" }}>
                {button?.label || "#"}
              </AbsoluteCenter>
            </Box>
          );
        })}
      </GridLayout>
    </DraggableGridContainer>
  );
};

const DraggableGridContainer = styled.div`
  .react-grid-item {
    z-index: 1 !important;
  }

  .react-grid-item.react-grid-placeholder {
    z-index: 0 !important;
  }
`;

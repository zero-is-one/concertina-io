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
                ...radiusStyles[button?.format || "full"],
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
                {button?.label || button?.note || "#"}
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

const radiusStyles = {
  full: { borderRadius: 8 },
  halfCircleTop: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  TopLeftRounded: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  TopRightRounded: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  halfCircleBottom: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  BottomLeftRounded: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  BottomRightRounded: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
};

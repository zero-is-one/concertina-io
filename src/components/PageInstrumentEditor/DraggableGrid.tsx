import { GridLayout, LayoutItem } from "react-grid-layout-next";
import "/node_modules/react-grid-layout-next/css/styles.css";
import { AbsoluteCenter, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { InstrumentButtonSchema } from "@/types";
import { useInstumentSchemaContext } from "@/hooks/useInstrumentSchemaContext";

export const DraggableGrid = ({
  setSelectedButton,
  selectedButton,
}: {
  setSelectedButton: (button: InstrumentButtonSchema | null) => void;
  selectedButton: InstrumentButtonSchema | null;
}) => {
  const { schema, setSchema } = useInstumentSchemaContext();
  const layout: LayoutItem[] = schema.buttons.map((item) => {
    return {
      i: item.id,
      x: item.x,
      y: item.y,
      w: 4,
      h: item.shape === "full" ? 4 : 2,
      isDraggable: true,
      isResizable: false,
    };
  });
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
          setSelectedButton(
            schema.buttons.find((b) => b.id === ev.item?.i) || null
          );
        }}
        onLayoutChange={(layout) => {
          const buttonsCopy = [...schema.buttons];
          layout.forEach((item) => {
            const button = buttonsCopy.find((b) => b.id === item.i);
            if (!button) return;
            button.x = item.x;
            button.y = item.y;
          });

          setSchema({
            ...schema,
            buttons: buttonsCopy,
          });
        }}
      >
        {layout.map((item) => {
          const button = schema.buttons.find((b) => b.id === item.i);

          return (
            <Box
              key={item.i}
              background={"gray.500"}
              color={"white"}
              style={{
                pointerEvents: "auto",
                cursor: "grab",
                zIndex: "10 important!",
                position: "relative",
                border: `3px solid ${
                  selectedButton?.id === item.i ? "blue" : "transparent"
                }`,
                ...shapeStyles[button?.shape || "full"],
              }}
              onClick={() => {
                setSelectedButton(
                  schema.buttons.find((b) => b.id === item.i) || null
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

const shapeStyles: { [key: string]: React.CSSProperties } = {
  full: { borderRadius: 8 },
  halfCircleTop: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  topLeftRounded: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  topRightRounded: {
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
  bottomLeftRounded: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 0,
  },
  bottomRightRounded: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 6,
  },
};

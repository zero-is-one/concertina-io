import { Side } from "./Side";

const leftSide = [
  ["e", "r", "t", "y", "u"],
  ["s", "d", "f", "g", "h"],
  ["z", "x", "c", "v", "b"],
];

const rightSide = [
  ["8", "9", "0", "-", "="],
  ["i", "o", "p", "[", "]"],
  ["k", "l", ";", "quote", "enter"],
];

const spaceBetween = 60;

export const ConcertinaButtonLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%", paddingRight: spaceBetween / 2 }}>
        <Side layout={leftSide} side="left" />
      </div>
      <div style={{ width: "50%", paddingLeft: spaceBetween / 2 }}>
        <Side layout={rightSide} side="right" />
      </div>
    </div>
  );
};

import { Wheatstone30CG } from "@/types";

export const Wheatstone30CGLayout = () => {
  return (
    <div style={{ display: "inline" }}>
      {leftKeys.map((k) => (
        <div
          key={k}
          style={{
            aspectRatio: 1,
            width: "20%",
            display: "inline-block",
            background: "#eee",
          }}
        >
          {Wheatstone30CG.keyCodeToNoteMap[k].pullNote}/
          {Wheatstone30CG.keyCodeToNoteMap[k].pushNote}
        </div>
      ))}
    </div>
  );
};

const leftKeys = [
  "KeyE",
  "KeyR",
  "KeyT",
  "KeyY",
  "KeyU",

  "KeyS",
  "KeyD",
  "KeyF",
  "KeyG",
  "KeyH",

  "KeyZ",
  "KeyX",
  "KeyC",
  "KeyV",
  "KeyB",
];
const rightKeys = [
  "Digit8",
  "Digit9",
  "Digit0",
  "Minus",
  "Equal",

  "KeyI",
  "KeyO",
  "KeyP",
  "BracketLeft",
  "BracketRight",

  "KeyK",
  "KeyL",
  "Semicolon",
  "Quote",
  "Enter",
];

export const layouts = {
  "cg-wheatstone-30": {
    name: "CG Wheatstone 30",
    layout: [
      { key: "e", push: "E3", pull: "F3" },
      { key: "r", push: "A3", pull: "Bb3" },
      { key: "t", push: "C#4", pull: "D#4" },
      { key: "y", push: "A4", pull: "G4" },
      { key: "u", push: "G#4", pull: "Bb4" },
      { key: "8", push: "C#5", pull: "D#5" },
      { key: "9", push: "A5", pull: "G5" },
      { key: "0", push: "G#5", pull: "Bb5" },
      { key: "-", push: "C#6", pull: "D#6" },
      { key: "=", push: "A6", pull: "F6" },
      { key: "s", push: "C3", pull: "G3" },
      { key: "d", push: "G3", pull: "B3" },
      { key: "f", push: "C4", pull: "D4" },
      { key: "g", push: "E4", pull: "F4" },
      { key: "h", push: "G4", pull: "A4" },
      { key: "i", push: "C5", pull: "B4" },
      { key: "o", push: "E5", pull: "D5" },
      { key: "p", push: "G5", pull: "F5" },
      { key: "[", push: "C6", pull: "A5" },
      { key: "]", push: "E6", pull: "B5" },
      { key: "z", push: "B3", pull: "A3" },
      { key: "x", push: "D4", pull: "F#4" },
      { key: "c", push: "G4", pull: "A4" },
      { key: "v", push: "B4", pull: "C5" },
      { key: "b", push: "D5", pull: "E5" },
      { key: "k", push: "G5", pull: "F#5" },
      { key: "l", push: "B5", pull: "A5" },
      { key: ";", push: "D6", pull: "C6" },
      { key: "quote", push: "G6", pull: "E6" },
      { key: "enter", push: "B6", pull: "F#6" },
    ],
  },
  "cg-jeffries-30": {
    name: "CG Jeffries 30",
    layout: [
      { key: "e", push: "E3", pull: "F3" },
      { key: "r", push: "A3", pull: "Bb3" },
      { key: "t", push: "C#4", pull: "D#4" },
      { key: "y", push: "A4", pull: "G4" },
      { key: "u", push: "G#4", pull: "Bb4" },
      { key: "8", push: "D#5", pull: "C#5" },
      { key: "9", push: "C#5", pull: "D#5" },
      { key: "0", push: "G#5", pull: "G5" },
      { key: "-", push: "C#6", pull: "Bb5" },
      { key: "=", push: "A6", pull: "D6" },
      { key: "s", push: "C3", pull: "G3" },
      { key: "d", push: "G3", pull: "B3" },
      { key: "f", push: "C4", pull: "D4" },
      { key: "g", push: "E4", pull: "F4" },
      { key: "h", push: "G4", pull: "A4" },
      { key: "i", push: "C5", pull: "B4" },
      { key: "o", push: "E5", pull: "D5" },
      { key: "p", push: "G5", pull: "F5" },
      { key: "[", push: "C6", pull: "A5" },
      { key: "]", push: "E6", pull: "B5" },
      { key: "z", push: "B3", pull: "A3" },
      { key: "x", push: "D4", pull: "F#4" },
      { key: "c", push: "G4", pull: "A4" },
      { key: "v", push: "B4", pull: "C5" },
      { key: "b", push: "D5", pull: "E5" },
      { key: "k", push: "G5", pull: "F#5" },
      { key: "l", push: "B5", pull: "A5" },
      { key: ";", push: "D6", pull: "C6" },
      { key: "quote", push: "G6", pull: "E6" },
      { key: "enter", push: "B6", pull: "F#6" },
    ],
  },
};

export const getKeyboardCombos = (layout: any) => {
  const combos: { combo: string; note: string }[] = [];
  layout.forEach((key: { key: string; push: string; pull: string }) => {
    combos.push({ combo: `space+${key.key}`, note: key.push });
    combos.push({ combo: key.key, note: key.pull });
  });

  return combos;
};

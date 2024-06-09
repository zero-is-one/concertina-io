import { NoteWithOctave } from "./types";

type AngloConcertinaButton = {
  push: NoteWithOctave;
  pull: NoteWithOctave;
};

export type AngloConcertina = {
  id: string;
  title: string;
  buttons: AngloConcertinaButton[];
};

export const angloConcertinas: AngloConcertina[] = [
  {
    id: "c/g Wheatstone 30 button anglo",
    title: "C/G Wheatstone 30 Button Anglo",
    buttons: [
      { push: "E3", pull: "F3" },
      { push: "A3", pull: "Bb3" },
      { push: "C#4", pull: "D#4" },
      { push: "A4", pull: "G4" },
      { push: "G#4", pull: "Bb4" },
      { push: "C#5", pull: "D#5" },
      { push: "A5", pull: "G5" },
      { push: "G#5", pull: "Bb5" },
      { push: "C#6", pull: "D#6" },
      { push: "A6", pull: "F6" },
      // New Row
      { push: "C3", pull: "G3" },
      { push: "G3", pull: "B3" },
      { push: "C4", pull: "D4" },
      { push: "E4", pull: "F4" },
      { push: "G4", pull: "A4" },
      { push: "C5", pull: "B4" },
      { push: "E5", pull: "D5" },
      { push: "G5", pull: "F5" },
      { push: "C6", pull: "A5" },
      { push: "E6", pull: "B5" },
      // New Row
      { push: "B3", pull: "A3" },
      { push: "D4", pull: "F#4" },
      { push: "G4", pull: "A4" },
      { push: "B4", pull: "C5" },
      { push: "D5", pull: "E5" },
      { push: "G5", pull: "F#5" },
      { push: "B5", pull: "A5" },
      { push: "D6", pull: "C6" },
      { push: "G6", pull: "E6" },
      { push: "B6", pull: "F#6" },
    ],
  },
  {
    id: "c/g jeffries 30 button anglo",
    title: "C/G Jeffries 30 Button Anglo",
    buttons: [
      { push: "E3", pull: "F3" },
      { push: "A3", pull: "Bb3" },
      { push: "C#4", pull: "D#4" },
      { push: "A4", pull: "G4" },
      { push: "G#4", pull: "Bb4" },
      { push: "D#5", pull: "C#5" },
      { push: "C#5", pull: "D#5" },
      { push: "G#5", pull: "G5" },
      { push: "C#6", pull: "Bb5" },
      { push: "A6", pull: "D6" },
      //New Row
      { push: "C3", pull: "G3" },
      { push: "G3", pull: "B3" },
      { push: "C4", pull: "D4" },
      { push: "E4", pull: "F4" },
      { push: "G4", pull: "A4" },
      { push: "C5", pull: "B4" },
      { push: "E5", pull: "D5" },
      { push: "G5", pull: "F5" },
      { push: "C6", pull: "A5" },
      { push: "E6", pull: "B5" },
      //New Row
      { push: "B3", pull: "A3" },
      { push: "D4", pull: "F#4" },
      { push: "G4", pull: "A4" },
      { push: "B4", pull: "C5" },
      { push: "D5", pull: "E5" },
      { push: "G5", pull: "F#5" },
      { push: "B5", pull: "A5" },
      { push: "D6", pull: "C6" },
      { push: "G6", pull: "E6" },
      { push: "B6", pull: "F#6" },
    ],
  },
  {
    id: "g/d wheatstone 30 button anglo",
    title: "G/D Wheatstone 30 Button Anglo",
    buttons: [
      { push: "B2", pull: "C3" },
      { push: "E3", pull: "F3" },
      { push: "G#3", pull: "Bb3" },
      { push: "E4", pull: "D4" },
      { push: "D#4", pull: "F4" },
      { push: "G#4", pull: "Bb4" },
      { push: "E5", pull: "D5" },
      { push: "D#5", pull: "F5" },
      { push: "G#5", pull: "Bb5" },
      { push: "E6", pull: "C6" },
      // New Row
      { push: "G2", pull: "D3" },
      { push: "D3", pull: "F#3" },
      { push: "G3", pull: "A3" },
      { push: "B3", pull: "C4" },
      { push: "D4", pull: "E4" },
      { push: "G4", pull: "F#4" },
      { push: "B4", pull: "A4" },
      { push: "D5", pull: "C5" },
      { push: "G5", pull: "E5" },
      { push: "B5", pull: "F#5" },
      // New Row
      { push: "F#3", pull: "E3" },
      { push: "A3", pull: "C#4" },
      { push: "D4", pull: "E4" },
      { push: "F#4", pull: "G4" },
      { push: "A4", pull: "B4" },
      { push: "D5", pull: "C#5" },
      { push: "F#5", pull: "E5" },
      { push: "A5", pull: "G5" },
      { push: "D6", pull: "B5" },
      { push: "F#6", pull: "C#6" },
    ],
  },
  {
    id: "g/d jeffries 30 button anglo",
    title: "G/D Jeffries 30 Button Anglo",
    buttons: [
      { push: "B2", pull: "C3" },
      { push: "E3", pull: "F3" },
      { push: "G#3", pull: "Bb3" },
      { push: "E4", pull: "D4" },
      { push: "D#4", pull: "F4" },
      { push: "G#4", pull: "Bb4" },
      { push: "E5", pull: "D5" },
      { push: "D#5", pull: "F5" },
      { push: "G#5", pull: "Bb5" },
      { push: "E6", pull: "C6" },
      // New Row
      { push: "G2", pull: "D3" },
      { push: "D3", pull: "F#3" },
      { push: "G3", pull: "A3" },
      { push: "B3", pull: "C4" },
      { push: "D4", pull: "E4" },
      { push: "G4", pull: "F#4" },
      { push: "B4", pull: "A4" },
      { push: "D5", pull: "C5" },
      { push: "G5", pull: "E5" },
      { push: "B5", pull: "F#5" },
      // New Row
      { push: "F#3", pull: "E3" },
      { push: "A3", pull: "C#4" },
      { push: "D4", pull: "E4" },
      { push: "F#4", pull: "G4" },
      { push: "A4", pull: "B4" },
      { push: "D5", pull: "C#5" },
      { push: "F#5", pull: "E5" },
      { push: "A5", pull: "G5" },
      { push: "D6", pull: "B5" },
      { push: "F#6", pull: "C#6" },
    ],
  },
] as const;

// Coover Notation System
// Left               Right
// a1 a2 a3 a4 a5     a1 a2 a3 a4 a5  Accidentals row
//  1  2  3  4  5      1  2  3  4  5  'Home' row
//  6  7  8  9 10      6  7  8  9 10  G row

export const indexToCooverNotationMap = [
  ...["1a", "2a", "3a", "4a", "5a", "1a", "2a", "3a", "4a", "5a"],
  ...["1", "2", "3", "4", "5", "1", "2", "3", "4", "5"],
  ...["6", "7", "8", "9", "10", "6", "7", "8", "9", "10"],
] as const;

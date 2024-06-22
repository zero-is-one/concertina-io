import { Concertina, ConcertinaAction, concertinas } from "./concertinas";

export type Note = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B" | "Bb"; // prettier-ignore
export type Octave = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type NoteWithOctave = `${Note}${Octave}`;

export const GameSettingOrder = ["Best", "Random"] as const;
export type GameSettingOrder = (typeof GameSettingOrder)[number];

export const GameSettingPlacement = [
  "Spaced Repetition",
  "Sequential",
  "Random",
] as const;

export type GameSettingPlacement = (typeof GameSettingPlacement)[number];

export type GameSettings = {
  concertinaId: (typeof concertinas)[number]["id"];
  order: GameSettingOrder;
  placement: GameSettingPlacement;
  key?: string;
};

export type FlashCard = {
  id: string;
  noteName: NoteWithOctave;
  action: ConcertinaAction;
  concertina: Concertina;
  placement: GameSettingPlacement;
  stats: {
    views: number;
    correct: number;
    incorrect: number;
    streak: number;
  };
};

export type DeckStats = {
  views: number;
  correct: number;
  incorrect: number;
  seen: number;
  total: number;
};

export type Deck = {
  flashcards: FlashCard[];
  stats: DeckStats;
};

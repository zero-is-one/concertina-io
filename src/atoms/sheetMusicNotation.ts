import { concertinas } from "@/concertinas";
import { GameSettings, NoteWithOctave } from "@/types";
import {
  concertinaButtonsToBasicFlashcards,
  randomize,
  sortByDistanceToCenter,
} from "@/utils/flashcard";
import { atom } from "jotai";
import { Note } from "tonal";
import { flashcardsAtom } from "./deck";

export const dispatchStartAtom = atom(
  null,
  (_get, set, { concertinaId, order, placement }: GameSettings) => {
    const concertina = concertinas.find((c) => c.id === concertinaId);
    if (!concertina) throw new Error(`Concertina not found: ${concertinaId}`);

    let flashcards = concertinaButtonsToBasicFlashcards({
      concertina,
      placement,
    });

    const extraAccidentalFlashcards = flashcards
      .filter(
        (flashcard) =>
          Note.enharmonic(flashcard.noteName) !== flashcard.noteName,
      )
      .map((flashcard) => {
        return {
          ...flashcard,
          noteName: Note.enharmonic(flashcard.noteName) as NoteWithOctave,
        };
      });

    flashcards = [...flashcards, ...extraAccidentalFlashcards];

    const extraClefFashcards = flashcards
      .filter(
        (flashcard) =>
          Note.midi(flashcard.noteName)! >= Note.midi("A3")! &&
          Note.midi(flashcard.noteName)! <= Note.midi("C4")!,
      )
      .map((flashcard) => {
        return {
          ...flashcard,
          clef: "treble",
        };
      });

    flashcards = [...flashcards, ...extraClefFashcards];

    if (order === "Random") {
      flashcards = randomize(flashcards);
    }
    if (order === "Best") {
      flashcards = sortByDistanceToCenter(flashcards);
    }

    set(flashcardsAtom, flashcards);
  },
);

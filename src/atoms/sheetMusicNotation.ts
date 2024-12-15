import { concertinas } from "@/concertinas";
import { FlashCard, GameSettings, NoteWithOctave } from "@/types";
import {
  concertinaButtonsToBasicFlashcards,
  randomize,
  sortByDistanceToCenter,
} from "@/utils/flashcard";
import { atom } from "jotai";
import { Note } from "tonal";
import { flashcardsAtom } from "./deck";
import { swapDuplicateFlashcardsWhenSameNoteName } from "./gameStateManager";

export const dispatchStartAtom = atom(
  null,
  (
    _get,
    set,
    { concertinaId, order, placement, reverseOrder }: GameSettings,
  ) => {
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
          Note.midi(flashcard.noteName)! <= Note.midi("E4")!,
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
      flashcards = lightShuffle(sortByDistanceToCenter(flashcards));
    }

    if (reverseOrder) {
      flashcards.reverse();
    }

    set(flashcardsAtom, flashcards);
  },
);

const lightShuffle = (flashcards: FlashCard[]) => {
  const newFlashcards = [...flashcards];

  for (let i = 0; i < newFlashcards.length - 4; i++) {
    const newPos = i + Math.floor(Math.random() * 3);
    const temp = newFlashcards[i];
    newFlashcards[i] = newFlashcards[newPos];
    newFlashcards[newPos] = temp;
  }

  swapDuplicateFlashcardsWhenSameNoteName(newFlashcards);

  return newFlashcards;
};

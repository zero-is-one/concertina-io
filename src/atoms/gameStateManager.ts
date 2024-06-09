import { FlashCard } from "@/types";
import { isNoteNameEqual } from "@/utils/note";
import { atom } from "jotai";
import { atomEffect } from "jotai-effect";
import {
  flashcardAtom,
  flashcardNoteNameAtom,
  flashcardsAtom,
  setterFlashcardAtom,
} from "./deck";
import { micSustainedNoteNameAtom } from "./mic";
import {
  isCompleteAtom as isTimerCompleteAtom,
  resetAtom as resetTimerAtom,
} from "./timer";

export const gameStateManagerAtom = atom((get) => {
  get(onTimerCompleteEffect);
  get(onNewFlashcardEffect);
  get(onCorrectNoteEffect);
});

export const onTimerCompleteEffect = atomEffect((get, set) => {
  const isTimerComplete = get(isTimerCompleteAtom);
  if (!isTimerComplete) return;
  set(setterFlashcardAtom, (flashcard) => ({
    ...flashcard,
    stats: {
      ...flashcard.stats,
      incorrect: flashcard.stats.incorrect + 1,
    },
  }));
});

const prevFlashcardIdAtom = atom<string | null>(null);
export const onNewFlashcardEffect = atomEffect((get, set) => {
  const flashcard = get(flashcardAtom);
  if (!flashcard) return;
  if (get(prevFlashcardIdAtom) === flashcard.id) return;
  set(prevFlashcardIdAtom, flashcard.id);

  set(
    setterFlashcardAtom,
    (flashcard) =>
      ({
        ...flashcard,
        stats: {
          ...flashcard.stats,
          views: flashcard.stats.views + 1,
        },
      }) satisfies FlashCard,
  );
});

export const onCorrectNoteEffect = atomEffect((get, set) => {
  const micNoteName = get(micSustainedNoteNameAtom);
  const desiredNoteName = get(flashcardNoteNameAtom);
  if (micNoteName === null) return;
  if (desiredNoteName === null) return;
  if (!isNoteNameEqual(micNoteName, desiredNoteName)) return;

  if (!get(isTimerCompleteAtom)) {
    set(setterFlashcardAtom, (flashcard) => ({
      ...flashcard,
      stats: {
        ...flashcard.stats,
        correct: flashcard.stats.correct + 1,
      },
    }));
  }

  set(resetTimerAtom);

  const flashcard = get(flashcardAtom);

  if (flashcard.placement === "Sequential") {
    set(flashcardsAtom, (flashcards) => {
      const [first, ...rest] = flashcards;
      return [...rest, first];
    });
  }

  if (flashcard.placement === "Random") {
    set(flashcardsAtom, (flashcards) => {
      //move first flashcard to spot in array
      const [first, ...rest] = flashcards;
      const randomIndex = Math.floor(Math.random() * rest.length);
      rest.splice(randomIndex, 0, first);
      return rest;
    });
  }
});

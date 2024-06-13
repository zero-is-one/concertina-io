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
  if (!get(isTimerCompleteAtom)) return;
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

  const isTimerComplete = get(isTimerCompleteAtom);

  set(setterFlashcardAtom, (flashcard) => ({
    ...flashcard,
    stats: {
      ...flashcard.stats,
      correct: flashcard.stats.correct + (!isTimerComplete ? 1 : 0),
      streak: isTimerComplete ? 0 : flashcard.stats.streak + 1,
    },
  }));

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
      return swapDuplicateFlashcardsWhenSameNoteName(rest);
    });
  }

  if (flashcard.placement === "Spaced Repetition") {
    const streak = flashcard.stats.streak;
    const promotionTeirs = [
      3, 3, 5, 7, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
    ] as const;
    const position =
      promotionTeirs[streak + (flashcard.stats.incorrect === 0 ? 1 : 0)] ||
      promotionTeirs.at(-1);
    set(flashcardsAtom, (flashcards) => {
      const [first, ...rest] = flashcards;
      rest.splice(position, 0, first);
      return swapDuplicateFlashcardsWhenSameNoteName(rest);
    });
  }
});

const swapDuplicateFlashcardsWhenSameNoteName = (flashcards: FlashCard[]) => {
  for (let i = 0; i < flashcards.length - 1; i++) {
    if (flashcards[i].noteName !== flashcards[i + 1].noteName) continue;

    for (let k = i + 2; k < flashcards.length - 1; k++) {
      if (flashcards[i + 1].noteName === flashcards[k].noteName) continue;
      const tmp = flashcards[i + 1];
      flashcards[i + 1] = flashcards[k];
      flashcards[k] = tmp;
      break;
    }
  }

  return flashcards;
};

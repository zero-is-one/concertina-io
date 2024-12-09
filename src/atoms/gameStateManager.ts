import { FlashCard } from "@/types";
import { isNoteNameEqual } from "@/utils/note";
import { atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { Midi } from "tonal";
import { flashcardAtom, flashcardsAtom, setterFlashcardAtom } from "./deck";
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
  const desiredNoteName = get(flashcardAtom)?.noteName;
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
    const positionJitter = Math.floor(Math.random() * 4);
    const position =
      Math.pow(flashcard.stats.incorrect > 0 ? 3 : 6, flashcard.stats.streak) +
      positionJitter;

    set(flashcardsAtom, (flashcards) => {
      const [first, ...rest] = flashcards;

      rest.splice(position, 0, first);
      return swapDuplicateFlashcardsWhenSameNoteName(rest);
    });
  }
});

export const swapDuplicateFlashcardsWhenSameNoteName = (
  flashcards: FlashCard[],
) => {
  for (let i = 0; i < flashcards.length - 1; i++) {
    if (
      Midi.toMidi(flashcards[i].noteName) !==
      Midi.toMidi(flashcards[i + 1].noteName)
    )
      continue;

    for (let k = i + 2; k < flashcards.length - 1; k++) {
      if (
        Midi.toMidi(flashcards[i + 1].noteName) ===
        Midi.toMidi(flashcards[k].noteName)
      )
        continue;

      const tmp = flashcards[i + 1];
      flashcards[i + 1] = flashcards[k];
      flashcards[k] = tmp;
      break;
    }
  }

  return flashcards;
};

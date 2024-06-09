import { Deck, FlashCard } from "@/types";
import { atom } from "jotai";
import { concertinaAtom } from "./cooverNotation";
import { isCompleteAtom as isTimerCompleteAtom } from "./timer";

export const flashcardsAtom = atom<FlashCard[]>([]);

export const flashcardAtom = atom((get) => {
  return get(flashcardsAtom)[0];
});

export const setterFlashcardAtom = atom(
  null,
  (_get, set, update: (flashcard: FlashCard) => FlashCard) => {
    set(flashcardsAtom, (flashcards) => {
      const [first, ...rest] = flashcards;
      return [update(first), ...rest];
    });
  },
);

export const flashcardNoteNameAtom = atom((get) => {
  const concertina = get(concertinaAtom);

  if (!concertina) return null;

  const flashcard = get(flashcardAtom);
  if (!flashcard) return null;

  const button = concertina.buttons[flashcard.index];
  return flashcard.action === "push" ? button.push : button.pull;
});

const defaultStats = {
  views: 0,
  correct: 0,
  incorrect: 0,
  seen: 0,
  total: 0,
};

export const statsAtom = atom((get) => {
  const flashcards = get(flashcardsAtom) || [];
  return flashcards.reduce(
    (acc, card) => ({
      views: acc.views + card.stats.views,
      correct: acc.correct + card.stats.correct,
      incorrect: acc.incorrect + card.stats.incorrect,
      seen: acc.seen + (card.stats.views > 0 ? 1 : 0),
      total: flashcards.length,
    }),
    defaultStats,
  );
});

export const showBottomSectionAtom = atom((get) => get(isTimerCompleteAtom));

export const deckAtom = atom((get) => {
  return {
    flashcards: get(flashcardsAtom),
    stats: get(statsAtom),
  } satisfies Deck as Deck;
});

import { concertinas, indexToCooverNotationMap } from "@/concertinas";
import { GameSettings } from "@/types";
import {
  concertinaButtonsToBasicFlashcards,
  randomize,
} from "@/utils/flashcard";
import { atom } from "jotai";
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

    if (order === "Random") {
      flashcards = randomize(flashcards);
    }

    if (order === "Best") {
      flashcards.sort(
        (a, b) =>
          Number(indexToCooverNotationMap[a.action.index].replace("a", "999")) -
          Number(indexToCooverNotationMap[b.action.index].replace("a", "999")),
      );
    }

    set(flashcardsAtom, flashcards);
  },
);

import { concertinas, indexToCooverNotationMap } from "@/concertinas";
import { FlashCard, GameSettings } from "@/types";
import { atom } from "jotai";
import { flashcardsAtom } from "./deck";

export const dispatchStartAtom = atom(
  null,
  (_get, set, { concertinaId, order, placement }: GameSettings) => {
    const concertina = concertinas.find((c) => c.id === concertinaId);
    if (!concertina) throw new Error(`Concertina not found: ${concertinaId}`);

    const flashcards: FlashCard[] = [];
    concertina.buttons.forEach((button, index) => {
      const card = {
        concertina,
        placement,
        stats: {
          views: 0,
          correct: 0,
          incorrect: 0,
          streak: 0,
        },
      };

      flashcards.push({
        id: Math.random().toString(35).slice(-6),
        ...card,
        action: {
          index,
          bellows: "pull",
        },
        noteName: button.pull,
      });
      flashcards.push({
        id: Math.random().toString(35).slice(-6),
        ...card,
        action: {
          index,
          bellows: "push",
        },
        noteName: button.push,
      });
    });

    if (order === "Random") {
      flashcards.sort(() => Math.random() - 0.5);
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

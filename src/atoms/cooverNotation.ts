import { angloConcertinas, indexToCooverNotationMap } from "@/concertinas";
import { FlashCard, GameSettingOrder, GameSettingPlacement } from "@/types";
import { atom } from "jotai";
import { flashcardsAtom } from "./deck";

export type GameSettings = {
  concertinaId: (typeof angloConcertinas)[number]["id"];
  order: GameSettingOrder;
  placement: GameSettingPlacement;
};

export const gameSettingsAtom = atom<GameSettings>({} as GameSettings);

export const concertinaAtom = atom((get) => {
  const concertinaId = get(gameSettingsAtom).concertinaId;
  return angloConcertinas.find((c) => c.id === concertinaId);
});

export const dispatchStartAtom = atom(
  null,
  (_get, set, { concertinaId, order, placement }: GameSettings) => {
    const concertina = angloConcertinas.find((c) => c.id === concertinaId);
    if (!concertina) throw new Error(`Concertina not found: ${concertinaId}`);

    const flashcards: FlashCard[] = [];
    concertina.buttons.forEach((button, index) => {
      const card = {
        index,
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
        action: "pull",
        noteName: button.pull,
      });
      flashcards.push({
        id: Math.random().toString(35).slice(-6),
        ...card,
        action: "push",
        noteName: button.push,
      });
    });

    if (order === "Random") {
      flashcards.sort(() => Math.random() - 0.5);
    } else {
      flashcards.sort(
        (a, b) =>
          Number(indexToCooverNotationMap[a.index].replace("a", "999")) -
          Number(indexToCooverNotationMap[b.index].replace("a", "999")),
      );
    }

    set(flashcardsAtom, flashcards);
    set(gameSettingsAtom, { concertinaId, order, placement });
  },
);

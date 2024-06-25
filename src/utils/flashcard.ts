import { Concertina } from "@/concertinas";
import { FlashCard, GameSettingPlacement } from "@/types";
import { Note } from "tonal";

const generateFlashcardId = () => Math.random().toString(35).slice(-6);
const noteNameToClef = (noteName: string) => {
  return Note.midi(noteName)! >= Note.midi("C4")! ? "treble" : "bass";
};

export const concertinaButtonsToBasicFlashcards = ({
  concertina,
  placement,
}: {
  concertina: Concertina;
  placement: GameSettingPlacement;
}) => {
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
      id: generateFlashcardId(),
      ...card,
      action: {
        index,
        bellows: "pull",
      },
      noteName: button.pull,
      clef: noteNameToClef(button.pull),
    });

    flashcards.push({
      id: generateFlashcardId(),
      ...card,
      action: {
        index,
        bellows: "push",
      },
      noteName: button.push,
      clef: noteNameToClef(button.push),
    });
  });

  return flashcards;
};

export const randomize = (flashcards: FlashCard[]) => {
  return flashcards
    .map((flashcard) => [Number(Math.random()), flashcard] as const)
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
};

export const sortByDistanceToCenter = (flashcards: FlashCard[]) => {
  // get center note
  const avg = flashcards.sort(
    (a, b) => Note.midi(a.noteName)! - Note.midi(b.noteName)!,
  )[Math.floor(flashcards.length / 2)].noteName;

  // sort by distance from center
  return flashcards.sort(
    (a, b) =>
      Math.abs(Note.midi(avg)! - Note.midi(a.noteName)!) -
      Math.abs(Note.midi(avg)! - Note.midi(b.noteName)!),
  );
};

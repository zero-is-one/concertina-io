import { NoteWithOctave } from "@/types";
import { Note } from "tonal";

export const isNoteNameEqual = (
  noteName: NoteWithOctave,
  noteNameToCompare: string,
) => {
  return Note.midi(noteName) === Note.midi(noteNameToCompare);
};

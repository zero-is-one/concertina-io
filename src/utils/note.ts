import { NoteWithOctave } from "@/types";
import { Note } from "tonal";

export const isNoteNameEqual = (
  noteName: NoteWithOctave,
  noteNameToCompare: string,
) => {
  return Note.midi(noteName) === Note.midi(noteNameToCompare);
};

// if sharp return flat, if flat return sharp, if natural return natural
export const getNoteAltAccidentals = (noteName: NoteWithOctave) => {
  const note = Note.get(noteName);
  const midi = Note.midi(noteName)!;
  return note.acc !== "#" ? Note.fromMidiSharps(midi) : Note.fromMidi(midi);
};

export const renderNoteSymbol = (noteName: NoteWithOctave) => {
  return noteName.replace("b", "♭").replace("#", "♯");
};

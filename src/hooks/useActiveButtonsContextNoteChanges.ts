import { useRef } from "react";
import { useActiveButtonsContext } from "./useActiveButtonsContext";

type NoteState = {
  note: string;
  action: "start" | "end";
};

export const useActiveButtonsContextNoteChanges = (
  callback: (state: NoteState[]) => void
) => {
  const { buttons: activeButtons } = useActiveButtonsContext();
  //remove duplicates
  const buttons = activeButtons.filter(
    (v, i, a) => a.findIndex((t) => t.note === v.note) === i
  );

  const activeNotes = useRef<string[]>([]);

  const additions: NoteState[] = [];
  const subtractions: NoteState[] = [];

  activeNotes.current.forEach((note) => {
    if (buttons.some((b) => b.note === note)) return;
    subtractions.push({ note, action: "end" });
  });

  buttons.forEach((button) => {
    if (activeNotes.current.includes(button.note)) return;
    additions.push({ note: button.note, action: "start" });
  });

  activeNotes.current = buttons.map((b) => b.note);

  callback([...additions, ...subtractions]);
};

import { useState, createContext } from "react";
import { Note } from "tonal";

type ActiveNotesContextType = {
  notes: string[];
  add: (note: string) => void;
  remove: (note: string) => void;
  clear: () => void;
  toggle: (note: string) => void;
};

export const ActiveNotesContext = createContext<
  ActiveNotesContextType | undefined
>(undefined);

export const ActiveNotesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notes, setNotes] = useState<string[]>([]);

  return (
    <ActiveNotesContext.Provider
      value={{
        notes,
        add: (note) =>
          setNotes((notes) => {
            if (notes.includes(note)) return notes;
            return [...notes, Note.get(note).name];
          }),
        remove: (note) => setNotes((notes) => notes.filter((n) => n !== note)),
        clear: () => setNotes([]),
        toggle: (note) =>
          setNotes((notes) =>
            notes.includes(note)
              ? notes.filter((n) => n !== note)
              : [...notes, note]
          ),
      }}
    >
      {children}
    </ActiveNotesContext.Provider>
  );
};

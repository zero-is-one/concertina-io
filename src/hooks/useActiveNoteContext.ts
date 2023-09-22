import { useContext } from "react";
import { ActiveNotesContext } from "@/contexts/ActiveNotesContext";

export const useActiveNotesContext = () => {
  const context = useContext(ActiveNotesContext);
  if (!context) {
    throw new Error(
      "ActiveNotesContext must be used within a correct Provider"
    );
  }
  return context;
};

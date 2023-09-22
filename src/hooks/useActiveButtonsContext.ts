import { useContext } from "react";
import { ActiveButtonsContext } from "@/contexts/ActiveButtonsContext";

export const useActiveButtonsContext = () => {
  const context = useContext(ActiveButtonsContext);
  if (!context) {
    throw new Error(
      "useActiveButtonsContext must be used within a correct Provider"
    );
  }
  return context;
};

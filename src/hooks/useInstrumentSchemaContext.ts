import { useContext } from "react";
import { InstrumentSchemaContext } from "@/contexts/InstrumentSchemaContext";

export const useInstumentSchemaContext = () => {
  const context = useContext(InstrumentSchemaContext);
  if (!context) {
    throw new Error(
      "useInstumentSchemaContext must be used within a InstrumentSchemaProvider"
    );
  }
  return context;
};

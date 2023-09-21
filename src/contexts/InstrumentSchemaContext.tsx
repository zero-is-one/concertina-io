import { useState, createContext } from "react";
import { InstrumentSchema } from "@/types";
import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";

type InstrumentSchemaContextType = {
  schema: InstrumentSchema;
  setSchema: (schema: InstrumentSchema) => void;
};

export const InstrumentSchemaContext = createContext<
  InstrumentSchemaContextType | undefined
>(undefined);

export const InstrumentSchemaProvider: React.FC<{
  children: React.ReactNode;
  defaultSchema: InstrumentSchema;
}> = ({ children, defaultSchema }) => {
  const [schema, setSchema] = useState<InstrumentSchema>(defaultSchema);

  return (
    <InstrumentSchemaContext.Provider value={{ schema, setSchema }}>
      {children}
    </InstrumentSchemaContext.Provider>
  );
};

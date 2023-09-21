import { InstrumentSchema, InstrumentState } from "@/types";
import { createContext } from "react";
import { instrumentSchemas } from "@/config/systemInstrumentSchemas";

const InstrumentStateContext = createContext<{
  schema: InstrumentSchema;
  state: InstrumentState;
}>({
  schema: instrumentSchemas[0],
  state: { id: "unknown", buttons: [] } as InstrumentState,
});

export const InstrumentStateProvider: React.FC<{
  children: React.ReactNode;
  schema: InstrumentSchema;
  state: InstrumentState;
}> = ({ children, schema, state }) => {
  return (
    <InstrumentStateContext.Provider value={{ schema, state }}>
      {children}
    </InstrumentStateContext.Provider>
  );
};

import { create } from "zustand";
import { InstrumentSchema } from "../types";
import { persist, createJSONStorage } from "zustand/middleware";
import { instrumentSchemas } from "@/config/systemInstrumentSchemas";

type InstrumentsStore = {
  selectedInstrumentSchemaId: string;
  instrumentSchemas: InstrumentSchema[];
  create: (instrument: InstrumentSchema) => void;
  remove: (id: InstrumentSchema) => void;
  update: (instrument: InstrumentSchema) => void;
  delete: (id: InstrumentSchema) => void;
};

export const useInstrumentSchemasStore = create<InstrumentsStore>()(
  persist(
    (set) => ({
      selectedInstrumentSchemaId: instrumentSchemas[0].id,
      instrumentSchemas: [],
      create: (instrumentSchema: InstrumentSchema) =>
        set((state) => ({
          instrumentSchemas: [...state.instrumentSchemas, instrumentSchema],
        })),
      remove: (instrumentSchema: InstrumentSchema) =>
        set((state) => ({
          instrumentSchemas: state.instrumentSchemas.filter(
            (i) => i.id !== instrumentSchema.id
          ),
        })),
      update: (instrumentSchema: InstrumentSchema) =>
        set((state) => ({
          instrumentSchemas: state.instrumentSchemas.map((i) =>
            i.id === instrumentSchema.id ? instrumentSchema : i
          ),
        })),
      delete: (instrumentSchema: InstrumentSchema) =>
        set((state) => ({
          instrumentSchemas: state.instrumentSchemas.filter(
            (i) => i.id !== instrumentSchema.id
          ),
        })),
    }),
    {
      name: "concertina-instrument-storagev2",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

import { create } from "zustand";

import { Instrument } from "../types";
import { persist, createJSONStorage } from "zustand/middleware";

type InstrumentsStore = {
  instruments: Instrument[];
  create: (instrument: Instrument) => void;
  remove: (id: string) => void;
  update: (instrument: Instrument) => void;
  delete: (id: string) => void;
};

export const useInstrumentsStore = create<InstrumentsStore>()(
  persist(
    (set) => ({
      instruments: [],
      create: (instrument: Instrument) =>
        set((state) => ({ instruments: [...state.instruments, instrument] })),
      remove: (id: string) =>
        set((state) => ({
          instruments: state.instruments.filter((i) => i.id !== id),
        })),
      update: (instrument: Instrument) =>
        set((state) => ({
          instruments: state.instruments.map((i) =>
            i.id === instrument.id ? instrument : i
          ),
        })),
      delete: (id: string) =>
        set((state) => ({
          instruments: state.instruments.filter((i) => i.id !== id),
        })),
    }),
    {
      name: "concertina-instrument-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

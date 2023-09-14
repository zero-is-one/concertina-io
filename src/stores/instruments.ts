import { create } from "zustand";

import { Instrument } from "../types";

type InstrumentsStore = {
  instruments: Instrument[];
};

export const useInstrumentsStore = create<InstrumentsStore>()((set) => ({
  instruments: [
    {
      name: "test",
      layout: [
        { i: "b", x: 0, y: 0 },
        { i: "c", x: 3, y: 5 },
      ],
    },
  ],
  // increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

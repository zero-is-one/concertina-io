import { instruments as systemInstruments } from "@/config/systemInstruments";
import { useInstrumentsStore } from "@/stores/instruments";
import { Instrument } from "@/types";

export const useInstruments = () => {
  const customInstruments = useInstrumentsStore((state) => state.instruments);

  const isSystemInstrument = (instrument: Instrument) => {
    return systemInstruments.find((i) => i.id === instrument.id);
  };

  return {
    instruments: customInstruments.concat(systemInstruments),
    customInstruments,
    systemInstruments,
    isSystemInstrument,
    defaultInstrument: systemInstruments[0],
  };
};

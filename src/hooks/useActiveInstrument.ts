import { useInstrumentsStore } from "@/stores/instruments";
import { Instrument } from "@/types";
import { useInstruments } from "./useInstruments";

export const useActiveInstrument = () => {
  const { instruments } = useInstruments();
  const activeInstrumentId = useInstrumentsStore(
    (state) => state.activeInstrumentId
  );

  const instrument = instruments.find((i) => i.id === activeInstrumentId);

  const setActive = (instrument: Instrument) => {
    useInstrumentsStore.setState({
      activeInstrumentId: instrument?.id || "",
    });
  };

  return { instrument, setActive };
};

import { useState } from "react";
import { Instrument, InstrumentButton } from "@/types";
import { useInstrumentsStore } from "@/stores/instruments";

export const useInstrument = (instrumentId?: string) => {
  const instruments = useInstrumentsStore((state) => state.instruments);
  const [instrument, setInstrument] = useState<Instrument>(
    instruments.find((i) => i.id === instrumentId) || {
      id: Math.random().toString(36).replace("0.", ""),
      name: "New Instrument",
      buttons: [],
    }
  );

  const [selectedButtonId, setSelectedButtonId] = useState<
    string | null | undefined
  >(null);

  const selectedButton = instrument.buttons.find(
    (b) => b.id === selectedButtonId
  );

  const update = (key: string, value: any) => {
    setInstrument({
      ...instrument,
      [key]: value,
    });
  };

  const createButton = () => {
    const id = Math.random().toString(36).replace("0.", "");

    const y =
      instrument.buttons.length === 0
        ? 0
        : instrument.buttons.reduce((acc, curr) => {
            return curr.y > acc ? curr.y : acc;
          }, 0) + 4;

    setInstrument({
      ...instrument,
      buttons: [
        ...instrument.buttons,
        {
          id,
          x: 0,
          y,
          format: "full",
          label: "",
          note: "",
          shortcut: "",
        },
      ],
    });

    setSelectedButtonById(id);
  };

  const updateButton = (button: InstrumentButton) => {
    setInstrument({
      ...instrument,
      buttons: instrument.buttons.map((b) => {
        if (b.id === button.id) {
          return button;
        }
        return b;
      }),
    });
  };

  const deleteButton = (button: InstrumentButton) => {
    setInstrument({
      ...instrument,
      buttons: instrument.buttons.filter((b) => b.id !== button.id),
    });
  };

  const setSelectedButtonById = (id: string) => {
    setSelectedButtonId(id);
  };

  const setSelectedButton = (button: InstrumentButton | null | undefined) => {
    setSelectedButtonId(button?.id);
  };

  return {
    instrument,
    update,
    createButton,
    updateButton,
    deleteButton,
    setSelectedButton,
    setSelectedButtonById,
    selectedButton,
  };
};

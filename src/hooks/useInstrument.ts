import { useState } from "react";
import { Instrument, InstrumentButton } from "@/types";

export const useInstrument = (i?: Instrument) => {
  const [instrument, setInstrument] = useState<Instrument>(
    i || {
      id: Math.random().toString(36).replace("0.", ""),
      name: generateDrSeussInstrument(),
      buttons: [],
    }
  );

  const [selectedButton, setSelectedButton] = useState<
    InstrumentButton | null | undefined
  >(null);

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
          type: "button",
          label: "",
          note: "",
        },
      ],
    });
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

  const update = (key: string, value: any) => {
    setInstrument({
      ...instrument,
      [key]: value,
    });
  };

  return {
    instrument,
    update,
    createButton,
    updateButton,
    deleteButton,
    setSelectedButton,
    selectedButton,
  };
};

function generateDrSeussInstrument() {
  const prefixes = [
    "Fizzle",
    "Bizzle",
    "Blimp",
    "Quirk",
    "Zobbl",
    "Flap",
    "Zing",
    "Zap",
  ];
  const middleParts = ["a", "o", "ee", "oo", "u"];
  const suffixes = [
    "phone",
    "doodle",
    "flute",
    "whistle",
    "harp",
    "horn",
    "rian",
  ];

  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomMiddle =
    middleParts[Math.floor(Math.random() * middleParts.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  const instrumentName = randomPrefix + randomMiddle + randomSuffix;

  return instrumentName;
}

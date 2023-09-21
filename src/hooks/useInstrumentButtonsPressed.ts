import { useKeyboardShortcutsPressed } from "./useKeyboardShortcuts";
import { Instrument } from "@/types";

export const useInstrumentButtonsPressed = (instrument: Instrument) => {
  const pressedKeys = useKeyboardShortcutsPressed(
    instrument.buttons.map((button) => button.shortcut)
  );

  return pressedKeys.map((keys) => {
    const button = instrument.buttons.find((b) => b.shortcut === keys);
    if (!button) throw new Error(`Button not found for shortcut ${keys}`);
    return button;
  });
};

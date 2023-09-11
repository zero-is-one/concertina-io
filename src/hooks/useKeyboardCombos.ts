import { useKeyPress } from "@/hooks/useKeyPress";
import { useRef } from "react";

type Key = string;
type ComboKeys = string;
type ComboAction = "press" | "release";
type ComboState = {
  keys: ComboKeys;
  action: ComboAction;
};

type KeyMap = Record<ComboKeys, boolean>;

export const useKeyboardCombos = (
  combos: ComboKeys[],
  callback: (state: ComboState[]) => void
) => {
  const keyMap = useRef<KeyMap>({});

  useKeyPress((ev) => {
    if (ev.repeat) return;

    const key: Key = ev.key
      .toLowerCase()
      .replace(" ", "space")
      .replace("'", "quote")
      .replace('"', "doublequote");

    keyMap.current[key] = ev.type === "keydown";

    let availableKeys = Object.keys(keyMap.current).filter(
      (key) => keyMap.current[key]
    );

    const comboStates: ComboState[] = combos
      .sort((a, b) => {
        if (a.length !== b.length) {
          return a.length - b.length;
        }
        return a.localeCompare(b);
      })
      .reverse()
      .map((keys) => {
        return { keys, action: "release" } as ComboState;
      })
      .map((comboState) => {
        const comboKeys = comboState.keys.split("+");
        const comboKeysPressed = comboKeys.filter(
          (comboKey) => availableKeys.indexOf(comboKey) > -1
        );

        if (comboKeysPressed.length !== comboKeys.length) {
          return comboState;
        }

        comboState.action = "press";
        availableKeys = availableKeys.filter((key) => !comboKeys.includes(key));

        return comboState;
      });

    callback(comboStates);
  });
};

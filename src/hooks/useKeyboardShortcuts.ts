import { useRef, useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";

type Key = string;
type ShortcutKeys = string;
type ShortcutAction = "press" | "release";
type ShortcutState = {
  keys: ShortcutKeys;
  action: ShortcutAction;
};

type KeyMap = Record<ShortcutKeys, boolean>;

export const useKeyboardShortcuts = (
  shortcuts: ShortcutKeys[],
  callback: (state: ShortcutState[]) => void
) => {
  const isKeyDownMap = useRef<KeyMap>({});

  const shortcutsSorted: ShortcutState[] = shortcuts
    .sort((a, b) => {
      if (a.split("+").length !== b.split("+").length) {
        return a.split("+").length - b.split("+").length;
      }
      if (a.length !== b.length) {
        return a.length - b.length;
      }
      return a.localeCompare(b);
    })
    .reverse()
    .map((keys) => {
      return { keys, action: "release" } as ShortcutState;
    });

  useKeyPress((ev) => {
    if (ev.repeat) return;

    const key: Key = ev.key
      .toLowerCase()
      .replace(" ", "space")
      .replace("'", "quote")
      .replace('"', "doublequote");

    isKeyDownMap.current[key] = ev.type === "keydown";

    let availableShortcuts = shortcutsSorted.map((s) => s.keys);

    const newState = shortcutsSorted.map((shortcut) => {
      const newShortcut: ShortcutState = { ...shortcut, action: "release" };
      const keys = shortcut.keys.split("+");

      const isPressed = keys.every((key) => isKeyDownMap.current[key]);
      if (!isPressed) return newShortcut;

      const isAvailable = availableShortcuts.includes(shortcut.keys);
      if (!isAvailable) return newShortcut;

      availableShortcuts = availableShortcuts.filter((a) => {
        const availKeys = a.split("+");

        for (let i = 0; i < availKeys.length; i++) {
          if (availKeys[i] !== keys[i]) return true;
        }

        return false;
      });

      newShortcut.action = "press";
      return newShortcut;
    });

    callback(newState);
  });
};

export const useKeyboardShortcutsPressed = (shortcuts: ShortcutKeys[]) => {
  const [shortcutStates, setShortcutStates] = useState<ShortcutKeys[]>([]);

  useKeyboardShortcuts(shortcuts, (s) => {
    setShortcutStates(s.filter((s) => s.action === "press").map((s) => s.keys));
  });

  return shortcutStates;
};

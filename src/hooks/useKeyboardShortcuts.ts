import { useRef, useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { ShortcutKeys, ShortcutState } from "@/types";
type Key = string;
type KeyMap = Record<ShortcutKeys, boolean>;

export const useKeyboardShortcuts = (
  shortcuts: ShortcutKeys[],
  callback: (state: ShortcutState[]) => void
) => {
  const isKeyDownMap = useRef<KeyMap>({});

  const shortcutsSorted: ShortcutState[] = (shortcuts || [])
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

export const useKeyboardShortcutsChanges = (
  shortcuts: ShortcutKeys[],
  callback: (state: ShortcutState[]) => void
) => {
  const pressedShortcuts = useRef<ShortcutKeys[]>([]);

  useKeyboardShortcuts(shortcuts, (state) => {
    const changes: ShortcutState[] = [];
    const pressed = state.filter((s) => s.action === "press");

    pressed.forEach((s) => {
      if (pressedShortcuts.current.includes(s.keys)) return;
      changes.push(s);
      pressedShortcuts.current = [...pressedShortcuts.current, s.keys];
    });

    pressedShortcuts.current.forEach((s) => {
      if (pressed.some((p) => p.keys === s)) return;
      pressedShortcuts.current = pressedShortcuts.current.filter(
        (p) => p !== s
      );
      changes.push({ keys: s, action: "release" });
    });

    callback(changes);
  });
};

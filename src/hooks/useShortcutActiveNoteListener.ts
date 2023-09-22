import { useState, createContext } from "react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { ShortcutKeys } from "@/types";

export const useShortcutActiveNoteListener = ({ children, shortcuts }) => {
  //   const [pressedShortcuts, setPressedShortcuts] = useState<ShortcutKeys[]>([]);
  //   const [virtuallyPressedShortcuts, setVirtuallyPressedShortcuts] = useState<
  //     ShortcutKeys[]
  //   >([]);
  //   useKeyboardShortcuts(shortcuts, (s) => {
  //     setPressedShortcuts(
  //       s.filter((s) => s.action === "press").map((s) => s.keys)
  //     );
  //   });
};

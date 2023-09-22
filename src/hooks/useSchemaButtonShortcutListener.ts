import { useKeyboardShortcutsChanges } from "@/hooks/useKeyboardShortcuts";
import { InstrumentSchema } from "@/types";
import { useRef } from "react";
import { useActiveButtonsContext } from "./useActiveButtonsContext";
export const useSchemaButtonShortcutListener = (
  instrumentSchema: InstrumentSchema
) => {
  const { add: addActiveButton, remove: removeActiveButton } =
    useActiveButtonsContext();

  const shortcuts = instrumentSchema.buttons.map((button) => button.shortcut);

  useKeyboardShortcutsChanges(shortcuts, (changes) => {
    changes.forEach((change) => {
      const buttons = instrumentSchema.buttons.filter(
        (b) => b.shortcut === change.keys
      );

      if (change.action === "press") {
        buttons.forEach(addActiveButton);
        return;
      }

      buttons.forEach(removeActiveButton);
    });
  });
};

import { useKeyboardShortcutsChanges } from "@/hooks/useKeyboardShortcuts";
import { useActiveButtonsContext } from "./useActiveButtonsContext";
import { InstrumentButtonSchema } from "@/types";

export const useActiveButtonsContextShortcutListener = (
  buttons: InstrumentButtonSchema[]
) => {
  const { add: addActiveButton, remove: removeActiveButton } =
    useActiveButtonsContext();

  const shortcuts = buttons.map((button) => button.shortcut);

  useKeyboardShortcutsChanges(shortcuts, (changes) => {
    changes.forEach((change) => {
      const btn: InstrumentButtonSchema[] = buttons.filter(
        (b) => b.shortcut === change.keys
      );

      if (change.action === "press") {
        btn.forEach(addActiveButton);
        return;
      }

      btn.forEach(removeActiveButton);
    });
  });
};

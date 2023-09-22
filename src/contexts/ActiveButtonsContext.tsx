import { useState, createContext } from "react";
import { InstrumentButtonSchema } from "@/types";

type ActiveButtonsContextType = {
  buttons: InstrumentButtonSchema[];
  add: (button: InstrumentButtonSchema) => void;
  remove: (button: InstrumentButtonSchema) => void;
  clear: () => void;
  toggle: (button: InstrumentButtonSchema) => void;
};

export const ActiveButtonsContext = createContext<
  ActiveButtonsContextType | undefined
>(undefined);

export const ActiveButtonsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [buttons, setButtons] = useState<InstrumentButtonSchema[]>([]);

  return (
    <ActiveButtonsContext.Provider
      value={{
        buttons,
        add: (button) => {
          if (buttons.find((b) => b.id === button.id)) return;
          setButtons((buttons) => [...buttons, button]);
        },
        remove: (button) => {
          setButtons((buttons) => buttons.filter((b) => b.id !== button.id));
        },
        clear: () => {
          setButtons([]);
        },
        toggle: (button) => {
          if (buttons.find((b) => b.id === button.id)) {
            setButtons((buttons) => buttons.filter((b) => b.id !== button.id));
            return;
          }

          setButtons((buttons) => [...buttons, button]);
        },
      }}
    >
      {children}
    </ActiveButtonsContext.Provider>
  );
};

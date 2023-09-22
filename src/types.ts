export type InstrumentSchema = {
  id: string;
  name: string;
  buttons: InstrumentButtonSchema[];
};

export type InstrumentButtonSchema = {
  id: string;
  x: number;
  y: number;
  shape: InstrumentButtonShape;
  label: string;
  note: string;
  shortcut: string;
};

export type InstrumentButtonShape =
  | "full"
  | "halfCircleTop"
  | "topRightRounded"
  | "topLeftRounded"
  | "halfCircleBottom"
  | "bottomRightRounded"
  | "bottomLeftRounded";

export type ShortcutKeys = string;
export type ShortcutAction = "press" | "release";
export type ShortcutState = {
  keys: ShortcutKeys;
  action: ShortcutAction;
};

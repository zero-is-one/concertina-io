export type Instrument = {
  id: string;
  name: string;
  buttons: InstrumentButton[];
};

export type InstrumentButton = {
  id: string;
  x: number;
  y: number;
  format: InstrumentButtonFormat;
  label: string;
  note: string;
  shortcut: string;
};

export type InstrumentButtonFormat =
  | "full"
  | "halfCircleTop"
  | "halfCircleBottom";

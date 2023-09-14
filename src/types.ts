export type Instrument = {
  id: string;
  name: string;
  buttons: InstrumentButton[];
};

export type InstrumentButton = {
  id: string;
  x: number;
  y: number;
  type: "button" | "halfLeft" | "halfRight";
  label: string;
  note: string;
};

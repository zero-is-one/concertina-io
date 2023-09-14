import { Layout } from "react-grid-layout-next";

export type Instrument = {
  name: string;
  layout: Layout;
  shortcuts: {
    i: string;
    key: string | string[];
    label: string | string[];
    note: string | string[];
  }[];
};

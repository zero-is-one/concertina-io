import cooverIcon from "@/assets/cooverIcon.png";
import sheetMusicIcon from "@/assets/sheetMusicIcon.png";
import { WritableAtom } from "jotai";
import { dispatchStartAtom } from "./atoms/cooverNotation";
import { CooverFingeringChart } from "./components/CooverFingeringChart/CooverFingeringChart";
import { AngloConcertinaButtonMarker } from "./concertinas";
import { GameSettings } from "./types";

type Exercise = {
  id: string;
  name: string;
  iconImgSrc: string;
  dispatchStartAtom: WritableAtom<null, [GameSettings], void>;
  cardFrontComponent: (
    buttonMarker: AngloConcertinaButtonMarker,
  ) => JSX.Element;
};

export const exercises: Exercise[] = [
  {
    id: "coover-notation",
    name: "Coover Notation",
    iconImgSrc: cooverIcon,
    dispatchStartAtom,
    cardFrontComponent: CooverFingeringChart,
  },
  {
    id: "sheet-music",
    name: "Sheet Music",
    iconImgSrc: sheetMusicIcon,
    dispatchStartAtom,
    cardFrontComponent: CooverFingeringChart,
  },
];

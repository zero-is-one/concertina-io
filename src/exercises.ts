import cooverIcon from "@/assets/cooverIcon.png";
import sheetMusicIcon from "@/assets/sheetMusicIcon.png";
import { WritableAtom } from "jotai";
import { dispatchStartAtom } from "./atoms/cooverNotation";
import { GameSettings } from "./types";

type Exercise = {
  id: string;
  name: string;
  iconImgSrc: string;
  dispatchStartAtom: WritableAtom<null, [GameSettings], void>;
};

export const exercises: Exercise[] = [
  {
    id: "coover-notation",
    name: "Coover Notation",
    iconImgSrc: cooverIcon,
    dispatchStartAtom,
  },
  {
    id: "sheet-music",
    name: "Sheet Music",
    iconImgSrc: sheetMusicIcon,
    dispatchStartAtom,
  },
];

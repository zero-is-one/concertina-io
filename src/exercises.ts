import cooverIcon from "@/assets/cooverIcon.png";
import sheetMusicIcon from "@/assets/sheetMusicIcon.png";
import { WritableAtom } from "jotai";
import { dispatchStartAtom as cooverNotationDispatchStartAtom } from "./atoms/cooverNotation";
import { dispatchStartAtom as sheetMusicNotationDispatchStartAtom } from "./atoms/sheetMusicNotation";
import { ConcertinaSheetMusicHintChart } from "./components/ConcertinaSheetMusicHintChart/ConcertinaSheetMusicHintChart";
import { CooverFingeringChart } from "./components/CooverFingeringChart/CooverFingeringChart";
import { Concertina, ConcertinaAction } from "./concertinas";
import { GameSettings, NoteWithOctave } from "./types";

type Exercise = {
  id: string;
  name: string;
  iconImgSrc: string;
  dispatchStartAtom: WritableAtom<null, [GameSettings], void>;
  cardFrontComponent: (props: {
    action: ConcertinaAction;
    concertina: Concertina;
    noteName: NoteWithOctave;
  }) => JSX.Element;
};

export const exercises: Exercise[] = [
  {
    id: "coover-notation",
    name: "Coover Notation",
    iconImgSrc: cooverIcon,
    dispatchStartAtom: cooverNotationDispatchStartAtom,
    cardFrontComponent: CooverFingeringChart,
  },
  {
    id: "sheet-music",
    name: "Sheet Music",
    iconImgSrc: sheetMusicIcon,
    dispatchStartAtom: sheetMusicNotationDispatchStartAtom,
    cardFrontComponent: ConcertinaSheetMusicHintChart,
  },
];

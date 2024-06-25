import { AbcRenderer } from "@/components/AbcRenderer/AbcRenderer";
import { Clef, NoteWithOctave } from "@/types";
import { scientificToABCKeySignature } from "@/utils/abc";
import { Key } from "tonal";

export const SingleNoteSheetMusic = ({
  noteName,
  clef = "treble",
  keySignature = "C",
  isMinor,
  isMelodic,
}: {
  noteName: NoteWithOctave;
  clef?: Clef;
  keySignature?: string;
  isMinor?: boolean;
  isMelodic?: boolean;
}) => {
  const keyObj = isMinor
    ? Key.minorKey(keySignature)
    : Key.majorKey(keySignature);

  const alteration = Math.abs(keyObj.alteration);
  const staffwidth = 90 + (alteration - 1) * 10;

  const notation = `X: 1
L:1/4
K:${keySignature} clef=${clef}
${scientificToABCKeySignature(noteName, keySignature, isMinor, isMelodic)}
`;

  return (
    <AbcRenderer
      abc={notation}
      params={{
        selectTypes: [],
        scale: 1,
        staffwidth,
        responsive: "resize",
        paddingtop: 0,
        paddingbottom: 3,
        paddingright: 3,
        paddingleft: 3,
      }}
    />
  );
};

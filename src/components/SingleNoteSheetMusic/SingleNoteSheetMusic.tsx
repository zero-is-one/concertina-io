import { AbcRenderer } from "@/components/AbcRenderer/AbcRenderer";
import { NoteWithOctave } from "@/types";
import { scientificToABCKeySignature } from "@/utils/abc";
import { Key } from "tonal";

export const SingleNoteSheetMusic = ({
  noteName,
  clef,
  keySignature,
  isMinor,
  isMelodic,
}: {
  noteName: NoteWithOctave;
  clef?: "treble" | "bass" | "alto" | "tenor";
  keySignature?: string;
  isMinor?: boolean;
  isMelodic?: boolean;
}) => {
  const keyObj = isMinor
    ? Key.minorKey(keySignature || "C")
    : Key.majorKey(keySignature || "C");

  const alteration = Math.abs(keyObj.alteration);
  const staffwidth = 90 + (alteration - 1) * 10;

  const notation = `X: 1
L:1/4
K:${keySignature || "C"} clef=${clef || "treble"}
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

import styled from "@emotion/styled";
import { Piano as ReactPiano } from "react-piano";
import "react-piano/dist/styles.css";
import { Note, Range } from "tonal";

export const Piano = ({
  notes,
  activeNotes,
  onKeyPress,
  onKeyRelease,
}: {
  notes: string[];
  activeNotes?: string[];
  onKeyPress?: (note: string) => void;
  onKeyRelease?: (note: string) => void;
}) => {
  const midiNotes: number[] = notes.map((note) => Note.midi(note)) as number[];
  const activeMidiNotes: number[] = (activeNotes || [])
    .map((note) => Note.midi(note))
    .filter((n) => !!n) as number[];

  const sortedMidiNotes = (midiNotes || [])
    .sort((a, b) => a - b)
    .filter((n) => !!n);

  const first: number = sortedMidiNotes[0];
  const last: number = sortedMidiNotes[sortedMidiNotes.length - 1];

  const allNotesInRange = Range.numeric([first, last]);

  const missingNotes = allNotesInRange.filter(
    (note) => !sortedMidiNotes.includes(note)
  );

  return (
    <PianoContainer
      allNotes={allNotesInRange}
      disabledNotes={missingNotes}
      style={{ height: 100 }}
    >
      <ReactPiano
        activeNotes={activeMidiNotes || []}
        noteRange={{
          first,
          last,
        }}
        playNote={(midiNumber) => {}}
        stopNote={(midiNumber) => {}}
        onPlayNoteInput={(midiNumber) => {
          if (!onKeyPress) return;

          onKeyPress(
            notes.find((note) => Note.midi(note) === midiNumber) as string
          );
        }}
        onStopNoteInput={(midiNumber) => {
          if (!onKeyRelease) return;

          onKeyRelease(
            notes.find((note) => Note.midi(note) === midiNumber) as string
          );
        }}
        renderNoteLabel={({
          keyboardShortcut,
          midiNumber,
          isActive,
          isAccidental,
        }) => {
          return (
            <div
              style={{ fontSize: "1cqw" }}
              className={`ReactPiano__NoteLabel ReactPiano__NoteLabel--${
                isAccidental ? "accidental" : "natural"
              }`}
            >
              {notes.find((note) => Note.midi(note) === midiNumber)}
            </div>
          );
        }}
      />
    </PianoContainer>
  );
};

const PianoContainer = styled.div<{
  allNotes: number[];
  disabledNotes: number[];
}>`
  .ReactPiano__Key--natural {
    background: linear-gradient(to bottom, #dfdfdf 30%, #ffffff 100%);
    box-shadow: inset 0px -3px 0 0 rgba(0, 0, 0, 0.3),
      -5px -5px 20px rgba(0, 0, 0, 0) inset, inset 3px 0px 3px #6d6d6d00,
      inset -3px 0px 3px #6d6d6d00, inset 0 10px 20px rgba(121, 121, 121, 0.2),
      inset 0 -10px 20px rgba(87, 87, 87, 0.2);
  }

  .ReactPiano__Key--accidental {
    box-shadow: -1px -1px 1px rgba(124, 124, 124, 0.2) inset,
      1px 0px 1px rgba(175, 175, 175, 0.4) inset,
      0 -5px 2px 3px rgba(0, 0, 0, 0.5) inset;
    background: linear-gradient(45deg, #222 0%, #464646 100%);
    border: 0.4px solid #303030;
  }

  ${(props) =>
    props.disabledNotes
      .map((note) => {
        return ` 
        .ReactPiano__Key:nth-of-type(${props.allNotes.indexOf(note) + 1}) {
                background: white;
                box-shadow:none;
                border: 0.4px solid #ccc;

                .ReactPiano__NoteLabel {
                    color: #ccc;
                }
            }
        `;
      })
      .join(``)}

  .ReactPiano__Key--active {
    background: green;

    .ReactPiano__NoteLabel {
      color: white;
    }
  }
`;

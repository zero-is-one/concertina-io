import styled from "@emotion/styled";
import { InstrumentSchema } from "@/types";
import { Piano } from "react-piano";
import "react-piano/dist/styles.css";
import { Note, Range } from "tonal";
import { useInstrumentButtonsPressed } from "@/hooks/useInstrumentButtonsPressed";

export const InstrumentPiano = ({
  instrumentSchema,
}: {
  instrumentSchema: InstrumentSchema;
}) => {
  const pressed = useInstrumentButtonsPressed(instrumentSchema);

  const notes = instrumentSchema.buttons.map((button) => button.note);
  const sortedNotesAsMidi = Note.sortedNames(notes).map((note) =>
    Note.midi(note)
  );
  const first: number = sortedNotesAsMidi[0] as number;
  const last: number = sortedNotesAsMidi[
    sortedNotesAsMidi.length - 1
  ] as number;

  const allNotesInRange = Range.numeric([first, last]);

  const missingNotes = allNotesInRange.filter(
    (note) => !sortedNotesAsMidi.includes(note)
  );

  return (
    <PianoContainer
      allNotes={allNotesInRange}
      disabledNotes={missingNotes}
      style={{ height: 100 }}
    >
      <Piano
        activeNotes={pressed.map((button) => Note.midi(button.note))}
        noteRange={{
          first,
          last,
        }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
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
              {Note.fromMidi(midiNumber as number)}
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
        .ReactPiano__Key:nth-child(${props.allNotes.indexOf(note) + 1}) {
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

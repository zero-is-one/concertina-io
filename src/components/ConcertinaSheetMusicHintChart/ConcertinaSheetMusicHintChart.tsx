import { Concertina, ConcertinaAction } from "@/concertinas";
import { NoteWithOctave } from "@/types";
import { isNoteNameEqual as isEqual } from "@/utils/note";
import { Box, Group, Stack, Title } from "@mantine/core";
import { SingleNoteSheetMusic } from "../SingleNoteSheetMusic/SingleNoteSheetMusic";

export const ConcertinaSheetMusicHintChart = ({
  concertina,
  action,
  noteName,
}: {
  concertina: Concertina;
  action: ConcertinaAction;
  noteName: NoteWithOctave;
}) => {
  let showAction = false;
  let showRow = false;

  concertina.buttons.forEach((button, index) => {
    if (index === action.index) return;

    if (isEqual(button["pull"], noteName)) showAction = true;
    if (isEqual(button["push"], noteName)) showAction = true;

    if (isEqual(button["push"], noteName) && action.bellows === "push")
      showRow = true;
    if (isEqual(button["pull"], noteName) && action.bellows === "pull")
      showRow = true;
  });

  let row = "middle";
  if (action.index / 10 < 1) row = "Outer";
  if (action.index / 10 >= 2) row = "Inner";

  return (
    <Stack gap={0} justify="center" align="center">
      <Box w="85%">
        <SingleNoteSheetMusic noteName={noteName} />
      </Box>
      <Group justify="center" align="center">
        {showAction && (
          <Title order={1}>{action.bellows === "pull" ? "Pull" : "Push"}</Title>
        )}
        {showRow && <Title order={1}>{row}</Title>}
      </Group>
    </Stack>
  );
};

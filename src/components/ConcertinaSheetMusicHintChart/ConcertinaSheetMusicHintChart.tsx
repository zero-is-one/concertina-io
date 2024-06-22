import { Concertina, ConcertinaAction } from "@/concertinas";
import { Box, Stack, Title } from "@mantine/core";
import { SingleNoteSheetMusic } from "../SingleNoteSheetMusic/SingleNoteSheetMusic";

export const ConcertinaSheetMusicHintChart = ({
  concertina,
  action,
}: {
  concertina: Concertina;
  action: ConcertinaAction;
}) => {
  const noteName = concertina.buttons[action.index][action.bellows];

  return (
    <Stack gap={0} justify="center" align="center">
      <Box w="85%">
        <SingleNoteSheetMusic noteName={noteName} />
      </Box>
      <Title order={1}>{action.bellows === "pull" ? "PULL" : "PUSH"}</Title>
    </Stack>
  );
};

import { Concertina, ConcertinaAction } from "@/concertinas";
import { Box, Stack, Text } from "@mantine/core";
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
    <Stack justify="center" align="center">
      <Box w="85%">
        <SingleNoteSheetMusic noteName={noteName} />
      </Box>
      <Text fz={40}>{action.bellows === "pull" ? "Pull" : "Push"}</Text>
    </Stack>
  );
};

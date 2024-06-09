import { isMicActiveAtom, micSustainedNoteNameAtom } from "@/atoms/mic";
import { elapsedTimeAtom } from "@/atoms/timer";
import { Deck } from "@/types";
import {
  Badge,
  Collapse,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { useAtomValue } from "jotai";
import { ReactNode } from "react";
import { TbMicrophone2, TbMicrophone2Off, TbNumber } from "react-icons/tb";

const toolbarHeight = 42;
const gap = 10;

export const Flashcard = ({
  deck,
  topSection,
  bottomSection,
  showBottomSection,
}: {
  deck: Deck;
  topSection: ReactNode;
  bottomSection: ReactNode;
  showBottomSection: boolean;
}) => {
  return (
    <>
      <Stack
        h="100%"
        justify="center"
        align="center"
        style={{ overflow: "hidden" }}
        w="100%"
        gap={0}
        bg="gray.1"
      >
        <Stack flex={1} w={"100%"} gap={gap} justify="center" align="center">
          <Card>
            <Stack h="100%" justify="center" align="center">
              {topSection}
            </Stack>
          </Card>

          <Collapse in={!!showBottomSection}>
            <Card>
              <Stack
                h="100%"
                w="100%"
                justify="center"
                align="center"
                style={{ opacity: showBottomSection ? 1 : 0 }}
              >
                {bottomSection}
              </Stack>
            </Card>
          </Collapse>
        </Stack>
        <Group
          w="100%"
          h={toolbarHeight}
          style={{ overflow: "hidden" }}
          justify="space-between"
          align="center"
          pos="relative"
        >
          <MicBadge />

          <Group
            pos={"absolute"}
            left={"50%"}
            style={{ transform: "translateX(-50%)" }}
          >
            <Badge variant="transparent" size="xl">
              <Group>
                <Text c="red" inherit>
                  {deck.stats.incorrect}
                </Text>
                <Text c="green" inherit>
                  {deck.stats.correct}
                </Text>
                <Text inherit>{deck.stats.views}</Text>
              </Group>
            </Badge>
          </Group>
          <Badge variant="transparent" size="xl" leftSection={<TbNumber />}>
            {deck.stats.seen}/{deck.stats.total}
          </Badge>
        </Group>
      </Stack>
      <Countdown />
    </>
  );
};

const MicBadge = () => {
  const micSustainedNoteName = useAtomValue(micSustainedNoteNameAtom);
  const isMicActive = useAtomValue(isMicActiveAtom);

  if (!isMicActive)
    return (
      <Badge
        variant="transparent"
        size="xl"
        leftSection={<TbMicrophone2Off />}
      />
    );

  return (
    <Badge variant="transparent" size="xl" leftSection={<TbMicrophone2 />}>
      {micSustainedNoteName || "--"}
    </Badge>
  );
};

const Countdown = () => {
  const elapsedTime = useAtomValue(elapsedTimeAtom);
  return (
    <>
      {!elapsedTime.isComplete && (
        <Progress
          radius={0}
          pos={"absolute"}
          w="100%"
          value={elapsedTime.percentComplete * 100}
          bottom={0}
        />
      )}
    </>
  );
};

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <Paper
      style={{
        width: `calc(50dvh - ${toolbarHeight / 2}px - ${gap * 1.5}px)`,
        height: `calc(50dvh - ${toolbarHeight / 2}px - ${gap * 1.5}px)`,
      }}
      p="sm"
      withBorder
    >
      {children}
    </Paper>
  );
};

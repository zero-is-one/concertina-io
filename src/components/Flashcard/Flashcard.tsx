import { isMicActiveAtom, micSustainedNoteNameAtom } from "@/atoms/mic";
import { elapsedTimeAtom } from "@/atoms/timer";
import { Deck } from "@/types";
import {
  ActionIcon,
  Badge,
  Collapse,
  Group,
  GroupProps,
  Paper,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { useAtomValue } from "jotai";
import { ReactNode } from "react";
import {
  FaArrowLeft,
  FaExclamationCircle,
  FaEye,
  FaStar,
} from "react-icons/fa";
import { TbMicrophone2, TbMicrophone2Off, TbNumber } from "react-icons/tb";
import { Link } from "react-router-dom";

const toolbarHeight = 44;
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
        <Toolbar>
          <ActionIcon variant="transparent" size={"sm"} component={Link} to="/">
            <FaArrowLeft width={"100%"} />
          </ActionIcon>
          <Text
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 500,
            }}
          >
            CONCERTINA.io
          </Text>
        </Toolbar>

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
        <Toolbar>
          <MicBadge />

          <Group
            pos={"absolute"}
            left={"50%"}
            style={{ transform: "translateX(-50%)" }}
            gap={4}
            w={"100%"}
            justify="center"
            align="center"
          >
            <Badge w={68} size="lg" color="green" leftSection={<FaStar />}>
              {deck.stats.correct}
            </Badge>
            <Badge
              w={68}
              size="lg"
              color="red"
              leftSection={<FaExclamationCircle />}
            >
              {deck.stats.incorrect}
            </Badge>
            <Badge w={68} size="lg" color="gray" leftSection={<FaEye />}>
              {deck.stats.views}
            </Badge>
          </Group>
          <Badge
            p={0}
            variant="transparent"
            size="lg"
            leftSection={<TbNumber />}
          >
            {deck.stats.seen}/{deck.stats.total}
          </Badge>
        </Toolbar>
      </Stack>
      <Countdown />
    </>
  );
};

const MicBadge = () => {
  const micSustainedNoteName = useAtomValue(micSustainedNoteNameAtom);
  const isMicActive = useAtomValue(isMicActiveAtom);

  return (
    <Badge
      p={0}
      variant="transparent"
      size="xl"
      leftSection={!isMicActive ? <TbMicrophone2Off /> : <TbMicrophone2 />}
    >
      {!isMicActive ? "X" : micSustainedNoteName || "--"}
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

const Toolbar = ({
  children,
  ...props
}: { children: ReactNode } & GroupProps) => {
  return (
    <Group
      w="100%"
      h={toolbarHeight}
      style={{ overflow: "hidden" }}
      justify="space-between"
      align="center"
      pos="relative"
      {...props}
      px={"sm"}
    >
      {children}
    </Group>
  );
};

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <Paper
      style={{
        width: `calc(50dvh - ${toolbarHeight}px - ${gap / 2}px)`,
        height: `calc(50dvh - ${toolbarHeight}px - ${gap / 2}px)`,
      }}
      p="sm"
      withBorder
    >
      {children}
    </Paper>
  );
};

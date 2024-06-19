import { deckAtom, flashcardAtom, showBottomSectionAtom } from "@/atoms/deck";
import { gameStateManagerAtom } from "@/atoms/gameStateManager";
import { isMicActiveAtom } from "@/atoms/mic";
import { ConcertinaFingeringChart } from "@/components/ConcertinaFingeringChart/ConcertinaFingeringChart";
import { CooverFingeringChart } from "@/components/CooverFingeringChart/CooverFingeringChart";
import { Flashcard } from "@/components/Flashcard/Flashcard";
import { WakeLock } from "@/components/WakeLock/WakeLock";
import { FullscreenLayout } from "@/layouts/FullscreenLayout";
import { Group, Stack, Title } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const ExercisePlay = () => {
  const navigate = useNavigate();
  useAtomValue(gameStateManagerAtom);
  const deck = useAtomValue(deckAtom);
  const flashcard = useAtomValue(flashcardAtom);
  const isMicActive = useAtomValue(isMicActiveAtom);
  const showBottomSection = useAtomValue(showBottomSectionAtom);

  useEffect(() => {
    if (deck.flashcards.length <= 0) {
      navigate("/coover-notation");
    }
  }, [deck.flashcards.length, navigate]);

  if (deck.flashcards.length === 0) return null;

  if (!isMicActive) {
    return (
      <Stack w="100%" justify="center" align="center">
        <Title order={2} ta={"center"}>
          Please allow microphone access
        </Title>
      </Stack>
    );
  }

  return (
    <WakeLock>
      <FullscreenLayout>
        <Flashcard
          deck={deck}
          topSection={
            <CooverFingeringChart
              index={flashcard.buttonMarker.index}
              action={flashcard.buttonMarker.action}
            />
          }
          bottomSection={
            <Stack w="100%" justify="center" align="center">
              <ConcertinaFingeringChart
                index={flashcard.buttonMarker.index}
                action={flashcard.buttonMarker.action}
              />
              <Group gap={"xs"} justify="center" align="center">
                <BsMusicNoteBeamed size={28} />
                <Title order={2}>{flashcard.noteName}</Title>
              </Group>
            </Stack>
          }
          showBottomSection={showBottomSection}
        />
      </FullscreenLayout>
    </WakeLock>
  );
};

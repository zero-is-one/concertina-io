import { deckAtom, flashcardAtom, showBottomSectionAtom } from "@/atoms/deck";
import { gameStateManagerAtom } from "@/atoms/gameStateManager";
import { isMicActiveAtom } from "@/atoms/mic";
import { ConcertinaFingeringChart } from "@/components/ConcertinaFingeringChart/ConcertinaFingeringChart";
import { Flashcard } from "@/components/Flashcard/Flashcard";
import { WakeLock } from "@/components/WakeLock/WakeLock";
import { exercises } from "@/exercises";
import { FullscreenLayout } from "@/layouts/FullscreenLayout";
import { Group, Stack, Title } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export const ExercisePlay = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  useAtomValue(gameStateManagerAtom);
  const deck = useAtomValue(deckAtom);
  const flashcard = useAtomValue(flashcardAtom);
  const isMicActive = useAtomValue(isMicActiveAtom);
  const showBottomSection = useAtomValue(showBottomSectionAtom);
  const exercise = exercises.find((exercise) => exercise.id === exerciseId);

  useEffect(() => {
    if (deck.flashcards.length <= 0) {
      navigate(`/exercise/${exerciseId}/start`);
    }
  }, [deck.flashcards.length, navigate, exerciseId]);

  if (!exercise) return null;
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
          topSection={exercise.cardFrontComponent(flashcard)}
          bottomSection={
            <Stack
              h="100%"
              w="100%"
              justify="center"
              align="center"
              style={{ opacity: showBottomSection ? 1 : 0 }}
              p={"xs"}
            >
              <ConcertinaFingeringChart {...flashcard} />
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

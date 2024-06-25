import { deckAtom, flashcardAtom, showBottomSectionAtom } from "@/atoms/deck";
import { gameStateManagerAtom } from "@/atoms/gameStateManager";
import { isMicActiveAtom } from "@/atoms/mic";
import { ConcertinaFingeringChart } from "@/components/ConcertinaFingeringChart/ConcertinaFingeringChart";
import { Flashcard } from "@/components/Flashcard/Flashcard";
import { WakeLock } from "@/components/WakeLock/WakeLock";
import { exercises } from "@/exercises";
import { FullscreenLayout } from "@/layouts/FullscreenLayout";
import { NoteWithOctave } from "@/types";
import { renderNoteSymbol } from "@/utils/note";
import { Stack, Title } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Note } from "tonal";

export const ExercisePlay = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  useAtomValue(gameStateManagerAtom);
  const deck = useAtomValue(deckAtom);
  const flashcard = useAtomValue(flashcardAtom);
  const isMicActive = useAtomValue(isMicActiveAtom);
  const showBottomSection = useAtomValue(showBottomSectionAtom);
  const exercise = exercises.find((exercise) => exercise.id === exerciseId);
  const enharmonicNote = Note.enharmonic(flashcard?.noteName) as NoteWithOctave;

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
              <Title order={1}>
                {renderNoteSymbol(flashcard.noteName)}
                {enharmonicNote !== flashcard.noteName &&
                  " / " + renderNoteSymbol(enharmonicNote)}
              </Title>
            </Stack>
          }
          showBottomSection={showBottomSection}
        />
      </FullscreenLayout>
    </WakeLock>
  );
};

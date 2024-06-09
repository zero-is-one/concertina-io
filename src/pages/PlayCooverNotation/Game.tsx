import {
  deckAtom,
  flashcardAtom,
  flashcardNoteNameAtom,
  showBottomSectionAtom,
} from "@/atoms/deck";
import { gameStateManagerAtom } from "@/atoms/gameStateManager";
import { isMicActiveAtom } from "@/atoms/mic";
import { ConcertinaFingeringChart } from "@/components/ConcertinaFingeringChart/ConcertinaFingeringChart";
import { CooverFingeringChart } from "@/components/CooverFingeringChart/CooverFingeringChart";
import { Flashcard } from "@/components/Flashcard/Flashcard";
import { FullscreenLayout } from "@/layouts/FullscreenLayout";
import { Stack, Title } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  const navigate = useNavigate();
  useAtomValue(gameStateManagerAtom);
  const deck = useAtomValue(deckAtom);
  const flashcard = useAtomValue(flashcardAtom);
  const flashcardNoteName = useAtomValue(flashcardNoteNameAtom);
  const isMicActive = useAtomValue(isMicActiveAtom);
  const showBottomSection = useAtomValue(showBottomSectionAtom);

  useEffect(() => {
    if (deck.flashcards.length <= 0) {
      navigate("/coover-notation/start");
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
    <FullscreenLayout>
      <Flashcard
        deck={deck}
        topSection={
          <CooverFingeringChart
            index={flashcard.index}
            action={flashcard.action}
          />
        }
        bottomSection={
          <Stack w="100%" justify="center" align="center">
            <ConcertinaFingeringChart
              index={flashcard.index}
              action={flashcard.action}
            />
            <Title order={2}>{flashcardNoteName}</Title>
          </Stack>
        }
        showBottomSection={showBottomSection}
      />
    </FullscreenLayout>
  );
};

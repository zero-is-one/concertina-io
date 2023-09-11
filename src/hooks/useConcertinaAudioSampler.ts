import { useEffect, useRef } from "react";
import { useSampler } from "@/hooks/useTone";

import { useKeyboardCombos } from "@/hooks/useKeyboardCombos";
import { getKeyboardCombos, layouts } from "@/config/concertinaLayout";

//https://github.com/gleitz/midi-js-soundfonts
import C4 from "@/assets/C4.mp3";
import A4 from "@/assets/A4.mp3";

export const useConcertinaAudioSampler = () => {
  const sampler = useSampler({
    C4,
    A4,
  });
  const playingNotes = useRef<string[]>([]);

  const noteCombosMap = getKeyboardCombos(layouts["cg-wheatstone-30"].layout);
  //.filter((c) => c.note === "A4");

  console.log({ noteCombosMap });

  useKeyboardCombos(
    noteCombosMap.map((c) => c.combo),
    (comboStates) => {
      if (!playingNotes.current) return;
      const pressedCombos = comboStates.filter((c) => c.action === "press");
      const pressedNotes = pressedCombos.map(
        (c) => noteCombosMap.find((n) => n.combo === c.keys)?.note || "ERROR"
      );

      if (pressedNotes.includes("ERROR"))
        throw new Error("ERROR: Pressed note not found");

      // get all pressed notes that are not in playing notes
      const notesToPlay = pressedNotes.filter(
        (note) => !playingNotes.current.includes(note)
      );

      notesToPlay.forEach((note) => {
        sampler.triggerAttack(note);
      });

      //get all playing notes that are not in pressed notes
      const notesToRelease = playingNotes.current.filter(
        (note) => !pressedNotes.includes(note)
      );

      notesToRelease.forEach((note) => {
        sampler.triggerRelease(note);
      });

      playingNotes.current = pressedNotes;
    }
  );
};

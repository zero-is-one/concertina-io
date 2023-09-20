import { useEffect, useRef } from "react";
import { useSampler } from "@/hooks/useTone";
import { Instrument } from "@/types";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { getKeyboardShorcuts, layouts } from "@/config/concertinaLayout";

//https://github.com/gleitz/midi-js-soundfonts
import C4 from "@/assets/C4.mp3";
import A4 from "@/assets/A4.mp3";

export const useInstrumentAudioSampler = (instrument: Instrument) => {
  const sampler = useSampler({
    C4,
    A4,
  });
  const playingNotes = useRef<string[]>([]);

  useKeyboardShortcuts(
    instrument.buttons.map((b) => b.shortcut),
    (states) => {
      if (!playingNotes.current) return;

      const pressedShorcuts = states.filter((c) => c.action === "press");
      const pressedNotes = pressedShorcuts.map(
        (c) =>
          instrument.buttons.find((n) => n.shortcut === c.keys)?.note || "ERROR"
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
      return;
    }
  );
};

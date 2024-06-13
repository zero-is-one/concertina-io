import { NoteWithOctave } from "@/types";
import { atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { PitchDetector } from "pitchy";
import { Note } from "tonal";

const defaultSampleRate = 44100;
const defaultFFTSize = 2048;

const sampleRateAtom = atom<number | null>(null);
const fftSizeAtom = atom<number | null>(null);
export const audioContextAtom = atom<AudioContext | null>(null);
export const mediaStreamAtom = atom<MediaStream | null>(null);
export const analyserNodeAtom = atom<AnalyserNode | null>(null);
const hasPermissionAtom = atom(false);
const isRequestingPermissionAtom = atom(false);
const isDeniedPermissionAtom = atom(false);

export const requestMicAtom = atom<null, [number?, number?], void>(
  null,
  async (
    get,
    set,
    requestSampleRate = defaultSampleRate,
    requestFFTSize = defaultFFTSize,
  ) => {
    function resetAudioContext(freshStream: MediaStream) {
      dispose();
      set(sampleRateAtom, requestSampleRate || defaultSampleRate);
      set(analyserNodeAtom, null);
      set(audioContextAtom, null);

      const freshAudioContext = new AudioContext({
        sampleRate: requestSampleRate,
      });

      const freshAnalyserNode = new AnalyserNode(freshAudioContext, {
        fftSize: requestFFTSize || defaultFFTSize,
      });

      freshAudioContext
        .createMediaStreamSource(freshStream)
        .connect(freshAnalyserNode);

      set(mediaStreamAtom, freshStream);
      set(sampleRateAtom, freshAudioContext.sampleRate);
      set(fftSizeAtom, freshAnalyserNode.fftSize);
      set(analyserNodeAtom, freshAnalyserNode);
      set(audioContextAtom, freshAudioContext);
    }

    function dispose() {
      const mediaStream = get(mediaStreamAtom);
      const audioContext = get(audioContextAtom);
      const analyserNode = get(analyserNodeAtom);

      if (mediaStream) {
        mediaStream.getAudioTracks().forEach((track) => {
          track.stop();
        });
      }
      if (audioContext) audioContext.close();
      if (analyserNode) analyserNode.disconnect();
    }

    if (get(isRequestingPermissionAtom)) return;
    set(isRequestingPermissionAtom, true);

    await navigator.mediaDevices
      .getUserMedia({
        audio: {
          //echoCancellation: false,
          noiseSuppression: false,
        },
      })
      .then((stream) => {
        resetAudioContext(stream);
        set(hasPermissionAtom, true);
      })
      .catch((err) => {
        console.log(err);
        set(isDeniedPermissionAtom, true);
      })
      .finally(() => {
        set(isRequestingPermissionAtom, false);
      });
  },
);

export const micPitchValueAtom = atom((get) => {
  get(pitchDetectorEffect);
  return get(micPitchStoreAtom);
});

const micPitchStoreAtom = atom<null | {
  pitch: number;
  clarity: number;
}>(null);

const pitchDetectorEffect = atomEffect((get, set) => {
  const analyserNode = get(analyserNodeAtom);
  const sampleRate = get(sampleRateAtom);

  if (!analyserNode || !sampleRate) return;

  const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
  const inputBuffer = new Float32Array(detector.inputLength);

  let requestAnimationFrameId: number | null = null;

  const anim = () => {
    analyserNode.getFloatTimeDomainData(inputBuffer);
    const [pitch, clarity] = detector.findPitch(inputBuffer, sampleRate);

    set(micPitchStoreAtom, { pitch, clarity });
    requestAnimationFrameId = requestAnimationFrame(anim);
  };

  requestAnimationFrameId = requestAnimationFrame(anim);

  return () => {
    if (!requestAnimationFrameId) return;
    cancelAnimationFrame(requestAnimationFrameId);
  };
});

const minClarity = 0.75;
const maxPitch = 10000;
const minPitch = 60;

export const micNoteAtom = atom((get) => {
  const { pitch, clarity } = get(micPitchValueAtom) || {};
  const badClarity = !clarity || clarity < minClarity;
  const badPitch = !pitch || pitch < minPitch || pitch > maxPitch;

  return {
    noteName:
      badClarity || badPitch ? null : (Note.fromFreq(pitch) as NoteWithOctave),
    pitch,
    clarity,
  };
});

const previousNotes: (NoteWithOctave | null)[] = [];
export const micSustainedNoteNameAtom = atom((get) => {
  const noteName = get(micNoteAtom).noteName;

  previousNotes.push(noteName);
  if (previousNotes.length > 5) previousNotes.shift();

  const noteCounts = previousNotes.reduce(
    (acc, note) => {
      const key = note || "null";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<NoteWithOctave | "null", number>,
  );

  const sortedNotes = Object.entries(noteCounts).sort((a, b) => b[1] - a[1]);
  const mostCommonNote = sortedNotes[0][0];
  if (mostCommonNote === "null") return null;
  return mostCommonNote as NoteWithOctave;
});

export const isMicActiveAtom = atom((get) => {
  return get(isRequestingPermissionAtom) || get(hasPermissionAtom);
});

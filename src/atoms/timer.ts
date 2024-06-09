import { atom } from "jotai";

const baseDurationAtom = atom(3);
const elapsedTimeValueAtom = atom(0);
const timeoutAtom = atom<{ id: number; started: number } | null>(null);

const startTimerAtom = atom(null, (get, set, action: "start" | "stop") => {
  if (action === "start") {
    if (get(timeoutAtom) !== null) return;
    if (get(elapsedTimeValueAtom) >= get(baseDurationAtom)) return;

    const tick = () => {
      const now = performance.now() / 1000;
      const timer = get(timeoutAtom);

      if (timer) {
        set(elapsedTimeValueAtom, now - timer.started);
      }

      const elapsedTime = get(elapsedTimeValueAtom);
      if (elapsedTime >= get(baseDurationAtom)) {
        set(timeoutAtom, null);
        return;
      }

      set(timeoutAtom, {
        started: timer ? timer.started : now - elapsedTime,
        id: window.setTimeout(tick, 50),
      });
    };

    tick();
  }
  if (action === "stop") {
    const timer = get(timeoutAtom);
    if (!timer) return;

    clearTimeout(timer.id);
    set(timeoutAtom, null);
  }
});

startTimerAtom.onMount = (dispatch) => {
  dispatch("start");
  return () => dispatch("stop");
};

export const elapsedTimeAtom = atom((get) => {
  get(startTimerAtom); // add dependency
  const duration = get(baseDurationAtom);
  const elapsedTime = get(elapsedTimeValueAtom);
  const percentComplete = Math.min(elapsedTime / duration, 1);

  return {
    elapsedTime: Math.min(elapsedTime, duration),
    percentComplete,
    isComplete: percentComplete >= 1,
  };
});

export const durationAtom = atom(
  (get) => get(baseDurationAtom),
  (_get, set, duration: number) => {
    set(baseDurationAtom, duration);
    set(startTimerAtom, "start");
  },
);

export const resetAtom = atom(null, (_get, set) => {
  set(startTimerAtom, "stop");
  set(elapsedTimeValueAtom, 0);
  set(startTimerAtom, "start");
});

export const isCompleteAtom = atom((get) => get(elapsedTimeAtom).isComplete);

import { useEffect } from "react";

export function useKeyPress(keyLookup: (event: KeyboardEvent) => void) {
  useEffect(() => {
    const downHandler = (ev: KeyboardEvent) => keyLookup(ev);
    const upHandler = (ev: KeyboardEvent) => keyLookup(ev);

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyLookup]);
}

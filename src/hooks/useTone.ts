import { useMemo } from "react";
import * as Tone from "tone";

export const useSampler = (options: any) => {
  const sampler = useMemo(() => {
    const sampler = new Tone.Sampler(options).toDestination();
    //sampler.volume.value = -10;
    return sampler;
  }, []);

  return sampler;
};

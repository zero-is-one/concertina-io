import { useMemo } from "react";
import * as Tone from "tone";

export const useSampler: ToneSamplerParameters = (...args) => {
  const sampler = useMemo(() => {
    const sampler = new Tone.Sampler(...args).toDestination();
    //sampler.volume.value = -10;
    return sampler;
  }, []);

  return sampler;
};

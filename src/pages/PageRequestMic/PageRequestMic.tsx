import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Stack, Text } from "@mantine/core";

export const PageRequestMic = () => {
  const mic = useMicrophoneContext();

  return (
    <Stack justify="center" align="center" w={"100dvw"} h={"100dvh"}>
      <Text>Microphone is required!</Text>
      <button onClick={() => mic.requestMicrophone()}>Activate Mic</button>
    </Stack>
  );
};

import { GameSettings, dispatchStartAtom } from "@/atoms/cooverNotation";
import { requestMicAtom } from "@/atoms/mic";
import { angloConcertinas } from "@/concertinas";
import { FullscreenLayout } from "@/layouts/FullscreenLayout";
import { GameSettingOrder, GameSettingPlacement } from "@/types";
import {
  Box,
  Button,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const MainMenu = () => {
  const navigate = useNavigate();
  const start = useSetAtom(dispatchStartAtom);
  const form = useForm({
    initialValues: {
      concertinaId: angloConcertinas[0].id,
      order: "Best" satisfies GameSettingOrder,
      placement: "Spaced Repetition" satisfies GameSettingPlacement,
    } satisfies GameSettings,
  });
  const requestMic = useSetAtom(requestMicAtom);

  const onSubmit = (values: GameSettings) => {
    start(values);
    requestMic();
    navigate("/coover-notation/play");
  };

  return (
    <FullscreenLayout>
      <Box p="md">
        <Paper withBorder p={"md"}>
          <Stack>
            <Title order={2}>Coover Notation</Title>
            <Text>Learn the concertina using the Coover Notation System</Text>

            <form onSubmit={form.onSubmit(onSubmit)}>
              <Stack>
                <Select
                  {...form.getInputProps("concertinaId")}
                  label="Concertinas"
                  data={angloConcertinas.map((concertina) => ({
                    label: concertina.title,
                    value: concertina.id,
                  }))}
                  w={300}
                  withCheckIcon={false}
                  allowDeselect={false}
                />

                <Select
                  {...form.getInputProps("order")}
                  label="Order"
                  data={GameSettingOrder}
                  w={160}
                  withCheckIcon={false}
                  allowDeselect={false}
                />

                <Select
                  {...form.getInputProps("placement")}
                  label="Placement"
                  data={GameSettingPlacement}
                  w={160}
                  withCheckIcon={false}
                  allowDeselect={false}
                />

                <Group justify="flex-end" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </FullscreenLayout>
  );
};

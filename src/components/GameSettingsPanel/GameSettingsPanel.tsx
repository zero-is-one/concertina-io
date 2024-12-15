import { requestMicAtom } from "@/atoms/mic";
import { concertinas } from "@/concertinas";
import { FullscreenLayout } from "@/layouts/FullscreenLayout";
import {
  GameSettingOrder,
  GameSettingPlacement,
  GameSettings,
  Note,
} from "@/types";
import {
  Box,
  Button,
  Group,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSetAtom } from "jotai";

export const GameSettingsPanel = ({
  title = "Game Title",
  onSubmit,
}: {
  title?: string;
  onSubmit: (values: GameSettings) => void;
}) => {
  const form = useForm({
    initialValues: {
      concertinaId: concertinas[0].id,
      order: "Best" satisfies GameSettingOrder,
      placement: "Spaced Repetition" satisfies GameSettingPlacement,
      key: "C" satisfies Note,
      reverseOrder: false,
    } satisfies GameSettings,
  });

  const requestMic = useSetAtom(requestMicAtom);

  const onFormSubmit = async (values: GameSettings) => {
    await requestMic();
    onSubmit(values);
  };

  return (
    <FullscreenLayout>
      <Box p="md">
        <Paper withBorder p={"md"}>
          <Stack>
            <Title order={2}>{title}</Title>
            <Text>Learn the concertina using {title}</Text>

            <form onSubmit={form.onSubmit(onFormSubmit)}>
              <Stack>
                <Select
                  {...form.getInputProps("concertinaId")}
                  label="Concertinas"
                  data={concertinas.map((concertina) => ({
                    label: concertina.title,
                    value: concertina.id,
                  }))}
                  w={300}
                  withCheckIcon={false}
                  allowDeselect={false}
                />

                <Select
                  {...form.getInputProps("placement")}
                  label="Placement"
                  data={GameSettingPlacement}
                  w={170}
                  withCheckIcon={false}
                  allowDeselect={false}
                />

                <Select
                  {...form.getInputProps("order")}
                  label="Order"
                  data={GameSettingOrder}
                  w={170}
                  withCheckIcon={false}
                  allowDeselect={false}
                />

                <Switch
                  {...form.getInputProps("reverseOrder")}
                  label="Reverse Note Order"
                />

                <Group justify="flex-end" mt="md">
                  <Button type="submit">Play</Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </FullscreenLayout>
  );
};

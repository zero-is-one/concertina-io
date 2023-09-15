import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Card,
  Button,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useInstrument } from "@/hooks/useInstrument";
import { InstrumentButton } from "../InstrumentButton/InstrumentButton";
import { InstrumentButtonFormat } from "@/types";

export const Sidebar = ({
  instrumentStore,
}: {
  instrumentStore: ReturnType<typeof useInstrument>;
}) => {
  return (
    <Box>
      {instrumentStore.selectedButton && (
        <ButtonOptions instrumentStore={instrumentStore} />
      )}
    </Box>
  );
};

export const ButtonOptions = ({
  instrumentStore,
}: {
  instrumentStore: ReturnType<typeof useInstrument>;
}) => {
  const buttonData = instrumentStore.selectedButton;

  return (
    <Box>
      <Card p={2} mb={2}>
        <FormControl mb={3}>
          <Select
            value={buttonData?.format as string}
            onChange={(e) => {
              if (!buttonData) return;

              instrumentStore.updateButton({
                ...buttonData,
                format: e.target.value as InstrumentButtonFormat,
              });
            }}
          >
            <option value="full">Full Button</option>
            <option value="halfCircleTop">Half Circle - Top</option>
            <option value="halfCircleBottom">Half Circle - Bottom</option>
          </Select>
        </FormControl>
        <FormControl variant="floating" my={3}>
          <Input
            type="text"
            value={buttonData?.note}
            onChange={(e) => {
              if (!buttonData) return;

              instrumentStore.updateButton({
                ...buttonData,
                note: e.target.value,
              });
            }}
          />
          <FormLabel>Music Note</FormLabel>
        </FormControl>
        <FormControl variant="floating" my={3}>
          <Input
            type="text"
            value={buttonData?.label}
            onChange={(e) => {
              if (!buttonData) return;

              instrumentStore.updateButton({
                ...buttonData,
                label: e.target.value,
              });
            }}
          />
          <FormLabel>Label</FormLabel>
        </FormControl>
        <FormControl variant="floating" my={3}>
          <Input
            type="text"
            value={buttonData?.shortcut}
            onChange={(e) => {
              if (!buttonData) return;

              instrumentStore.updateButton({
                ...buttonData,
                shortcut: e.target.value,
              });
            }}
          />
          <FormLabel>Keyboard Shortcut </FormLabel>
        </FormControl>
      </Card>

      <Button
        onClick={() => {
          if (!instrumentStore.selectedButton) return;
          instrumentStore.deleteButton(instrumentStore.selectedButton);
          instrumentStore.setSelectedButton(null);
        }}
        leftIcon={<FaTrash />}
        colorScheme="red"
        w={"100%"}
      >
        Delete
      </Button>
    </Box>
  );
};

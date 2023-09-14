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

export const Sidebar = ({
  instrumentStore,
}: {
  instrumentStore: ReturnType<typeof useInstrument>;
}) => {
  return (
    <Box width={180} mt={"60px"}>
      <Button
        onClick={() => {
          instrumentStore.createButton();
        }}
      >
        Add Button
      </Button>
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
  return (
    <Box>
      <Card p={2} mb={2}>
        <FormControl mb={3}>
          <FormLabel>Button Type</FormLabel>
          <Select>
            <option value="option1">option 1</option>
            <option value="option2">option 2</option>
            <option value="option3">option 3</option>
          </Select>
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Music Note</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Label</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Keyboard Shortcut</FormLabel>
          <Input type="text" />
        </FormControl>
      </Card>

      <Button
        onClick={() => {
          instrumentStore.deleteButton(instrumentStore.selectedButton);
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

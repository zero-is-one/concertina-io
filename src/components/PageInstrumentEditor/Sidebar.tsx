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
import { useInstumentSchemaContext } from "@/hooks/useInstrumentSchemaContext";
import { InstrumentButtonShape, InstrumentButtonSchema } from "@/types";

export const Sidebar = ({
  setSelectedButton,
  selectedButton,
}: {
  setSelectedButton: (button: InstrumentButtonSchema | null) => void;
  selectedButton: InstrumentButtonSchema | null;
}) => {
  const { schema, setSchema } = useInstumentSchemaContext();

  const updateButton = (button: InstrumentButtonSchema) => {
    setSchema({
      ...schema,

      buttons: schema.buttons.map((b) => {
        if (b.id === button.id) return button;
        return b;
      }),
    });
  };

  const deleteButton = (button: InstrumentButtonSchema) => {
    setSchema({
      ...schema,
      buttons: schema.buttons.filter((b) => b.id !== button.id),
    });
  };

  if (!selectedButton) return null;

  return (
    <Box>
      <Card p={2} mb={2}>
        <FormControl mb={3}>
          <Select
            value={selectedButton.shape as string}
            onChange={(e) => {
              updateButton({
                ...selectedButton,
                shape: e.target.value as InstrumentButtonShape,
              });
            }}
          >
            <option value="full">Full Button</option>
            <option value="halfCircleTop">Half Circle - Top</option>
            <option value="topRightRounded">Top Right Rounded</option>
            <option value="topLeftRounded">Top Left Rounded</option>
            <option value="halfCircleBottom">Half Circle - Bottom</option>
            <option value="bottomRightRounded">Bottom Right Rounded</option>
            <option value="bottomLeftRounded">Bottom Left Rounded</option>
          </Select>
        </FormControl>
        <FormControl variant="floating" my={3}>
          <Input
            type="text"
            value={selectedButton.note}
            onChange={(e) => {
              updateButton({
                ...selectedButton,
                note: e.target.value,
              });
            }}
          />
          <FormLabel>Music Note</FormLabel>
        </FormControl>
        <FormControl variant="floating" my={3}>
          <Input
            type="text"
            value={selectedButton.label}
            onChange={(e) => {
              updateButton({
                ...selectedButton,
                label: e.target.value,
              });
            }}
          />
          <FormLabel>Label</FormLabel>
        </FormControl>
        <FormControl variant="floating" my={3}>
          <Input
            type="text"
            value={selectedButton.shortcut}
            onChange={(e) => {
              updateButton({
                ...selectedButton,
                shortcut: e.target.value,
              });
            }}
          />
          <FormLabel>Keyboard Shortcut </FormLabel>
        </FormControl>
      </Card>

      <Button
        onClick={() => {
          deleteButton(selectedButton);
          setSelectedButton(null);
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

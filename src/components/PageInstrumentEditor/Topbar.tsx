import { Button, Input, Flex, IconButton } from "@chakra-ui/react";
import { InputGroup, InputLeftAddon, Tooltip } from "@chakra-ui/react";
import { AbsoluteCenter } from "@chakra-ui/react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";
import { useInstrumentSchemaEditor } from "@/hooks/useInstrumentSchemaEditor";
import { useNavigate } from "react-router-dom";
import { useActiveInstrumentSchema } from "@/hooks/useActiveInstrumentSchema";
import { useInstumentSchemaContext } from "@/hooks/useInstrumentSchemaContext";
import { InstrumentButtonSchema } from "@/types";

export const Topbar = ({
  setSelectedButton,
}: {
  setSelectedButton: (button: InstrumentButtonSchema) => void;
}) => {
  const { schema, setSchema } = useInstumentSchemaContext();
  const updateInstrumentSchemaInStore = useInstrumentSchemasStore(
    (state) => state.update
  );
  const navigate = useNavigate();

  const save = () => {
    setSchema(schema);
    updateInstrumentSchemaInStore(schema);
    useInstrumentSchemasStore.setState({
      selectedInstrumentSchemaId: schema.id,
    });
    navigate("/");
  };

  const createButton = () => {
    const id = Math.random().toString(36).replace("0.", "");

    const y =
      schema.buttons.length === 0
        ? 0
        : schema.buttons.reduce((acc, curr) => {
            return curr.y > acc ? curr.y : acc;
          }, 0) + 4;

    const button: InstrumentButtonSchema = {
      id,
      x: 0,
      y,
      shape: "full",
      label: "",
      note: "",
      shortcut: "",
    };

    setSchema({
      ...schema,
      buttons: [...schema.buttons, button],
    });

    setSelectedButton(button);
  };

  return (
    <Flex
      width={"100%"}
      p={2}
      background={"white"}
      justifyContent={"space-between"}
      position={"relative"}
    >
      <Tooltip hasArrow label="Add button" placement="right">
        <IconButton
          aria-label="Add Button"
          colorScheme="teal"
          size={"lg"}
          icon={<BiSolidMessageSquareAdd size={28} />}
          onClick={createButton}
        />
      </Tooltip>
      <AbsoluteCenter>
        <InputGroup size={"lg"}>
          <InputLeftAddon children="Name:" />
          <Input
            type="text"
            placeholder="phone number"
            value={schema.name}
            onChange={(e) => {
              setSchema({ ...schema, name: e.target.value });
            }}
          />
        </InputGroup>
      </AbsoluteCenter>

      <Button size={"lg"} color={"white"} bg={"pink.400"} onClick={save}>
        Save
      </Button>
    </Flex>
  );
};

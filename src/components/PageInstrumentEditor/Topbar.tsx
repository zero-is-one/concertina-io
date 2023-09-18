import { Button, Input, Flex, IconButton } from "@chakra-ui/react";
import { InputGroup, InputLeftAddon, Tooltip } from "@chakra-ui/react";
import { AbsoluteCenter } from "@chakra-ui/react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

import { useInstrumentsStore } from "@/stores/instruments";
import { useInstrument } from "@/hooks/useInstrument";
import { useNavigate } from "react-router-dom";
import { useActiveInstrument } from "@/hooks/useActiveInstrument";

export const Topbar = ({
  instrumentStore,
}: {
  instrumentStore: ReturnType<typeof useInstrument>;
}) => {
  const { setActive } = useActiveInstrument();
  const updateInstrument = useInstrumentsStore((state) => state.update);
  const navigate = useNavigate();

  const save = () => {
    updateInstrument(instrumentStore.instrument);
    setActive(instrumentStore.instrument);
    navigate("/");
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
          onClick={() => {
            instrumentStore.createButton();
          }}
        />
      </Tooltip>
      <AbsoluteCenter>
        <InputGroup size={"lg"}>
          <InputLeftAddon children="Name:" />
          <Input
            type="text"
            placeholder="phone number"
            value={instrumentStore.instrument.name}
            onChange={(e) => {
              instrumentStore.update("name", e.target.value);
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

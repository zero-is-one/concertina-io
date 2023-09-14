import {
  Box,
  Button,
  Input,
  HStack,
  FormControl,
  FormLabel,
  Flex,
  IconButton,
  InputLeftAddon,
  InputGroup,
  Center,
  AbsoluteCenter,
  Tooltip,
} from "@chakra-ui/react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

import { useInstrument } from "@/hooks/useInstrument";

export const Topbar = ({
  instrumentStore,
}: {
  instrumentStore: ReturnType<typeof useInstrument>;
}) => {
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

      <Button size={"lg"} color={"white"} bg={"pink.400"}>
        Save
      </Button>
    </Flex>
  );
};

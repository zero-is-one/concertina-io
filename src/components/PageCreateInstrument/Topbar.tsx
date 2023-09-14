import { Instrument } from "@/types";
import {
  Box,
  Button,
  Flex,
  Input,
  HStack,
  IconButton,
  FormControl,
  FormLabel,
  Center,
  VStack,
} from "@chakra-ui/react";

import { useInstrument } from "@/hooks/useInstrument";

export const Topbar = ({
  instrumentStore,
}: {
  instrumentStore: ReturnType<typeof useInstrument>;
}) => {
  return (
    <HStack spacing={40} width={"100%"} p={2}>
      <FormControl variant="floating">
        <Input
          value={instrumentStore.instrument.name}
          onChange={(e) => {
            instrumentStore.update("name", e.target.value);
          }}
          width={200}
          size={"lg"}
          placeholder=""
        />
        <FormLabel>Instrument Name</FormLabel>
      </FormControl>
      <Button size={"lg"} color={"white"} bg={"pink.400"}>
        Save
      </Button>
    </HStack>
  );
};

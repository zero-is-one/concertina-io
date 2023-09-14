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

import styled from "@emotion/styled";
import "/node_modules/react-grid-layout-next/css/styles.css";
import { InstrumentButton } from "@/components/InstrumentButton/InstrumentButton";
import { InstrumentDualButton } from "@/components/InstrumentButton/InstrumentDualButton";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useInstrumentsStore } from "@/stores/instruments";
import { useState } from "react";
import { Instrument, InstrumentButtonProps } from "@/types";
import { DraggableGrid } from "./DraggableGrid";
import { Side } from "../ConcertinaButtonLayout/Side";

import { Sidebar } from "./Sidebar";

export const PageCreateLayout = () => {
  const instruments = useInstrumentsStore((state) => state.instruments);

  const [selected, setSelected] = useState<string | null>(null);
  const [instrument, setInstrument] = useState<Instrument>({
    name: "hi",
    layout: [],
    shortcuts: [],
  });

  const addLayoutItem = () => {
    const i = Math.random().toString(36).substring(2, 15);
    setInstrument({
      ...instrument,
      layout: [
        ...instrument.layout,
        {
          i,
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          isResizable: false,
          isDraggable: true,
          isBounded: true,
        },
      ],
      shortcuts: [
        ...instrument.shortcuts,
        { i, key: "d", label: "A4", note: "A4" },
      ],
    });
  };

  return (
    <FullscreenContainer alignItems={"center"} justifyContent={"center"}>
      <HStack>
        <Sidebar />
        <VStack>
          <HStack spacing={40} width={"100%"}>
            <FormControl variant="floating">
              <Input width={200} size={"lg"} placeholder=" " />
              <FormLabel>Instrument Name</FormLabel>
            </FormControl>
            <Button size={"lg"} color={"white"} bg={"pink.400"}>
              Save
            </Button>
          </HStack>
          <DraggableGrid />
        </VStack>
        <Box width={160}></Box>
      </HStack>
    </FullscreenContainer>
  );
};

const FullscreenContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background: #f9fbfd;
`;

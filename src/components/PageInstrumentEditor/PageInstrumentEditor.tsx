import { HStack, VStack } from "@chakra-ui/react";
import { DraggableGrid } from "./DraggableGrid";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useInstrument } from "@/hooks/useInstrument";
import { useParams } from "react-router-dom";

export const PageInstrumentEditor = () => {
  const { id } = useParams<{ id: string }>();
  const instrumentStore = useInstrument(id);

  return (
    <VStack spacing={4} background={"gray.100"} minHeight={"100vh"}>
      <Topbar instrumentStore={instrumentStore} />
      <HStack spacing={4} alignItems={"top"} px={2}>
        <Sidebar instrumentStore={instrumentStore} />
        <DraggableGrid instrumentStore={instrumentStore} />
      </HStack>
    </VStack>
  );
};

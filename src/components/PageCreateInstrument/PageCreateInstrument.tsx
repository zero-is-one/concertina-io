import { HStack, VStack } from "@chakra-ui/react";
import { DraggableGrid } from "./DraggableGrid";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useInstrument } from "@/hooks/useInstrument";

export const PageCreateInstrument = () => {
  const instrumentStore = useInstrument();

  return (
    <VStack>
      <Topbar instrumentStore={instrumentStore} />
      <HStack>
        <Sidebar instrumentStore={instrumentStore} />
        <DraggableGrid instrumentStore={instrumentStore} />
      </HStack>
    </VStack>
  );
};

import { HStack, VStack } from "@chakra-ui/react";
import { DraggableGrid } from "./DraggableGrid";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useParams } from "react-router-dom";
import { InstrumentSchemaProvider } from "@/contexts/InstrumentSchemaContext";
import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";
import { InstrumentSchema } from "@/types";
import { useState } from "react";
import { InstrumentButtonSchema } from "@/types";
import { useInstumentSchemaContext } from "@/hooks/useInstrumentSchemaContext";
export const PageInstrumentEditor = () => {
  const { id } = useParams<{ id: string }>();
  const instrumentsSchemas = useInstrumentSchemasStore(
    (state) => state.instrumentSchemas
  );

  const schema = instrumentsSchemas.find((schema) => schema.id === id);

  return (
    <InstrumentSchemaProvider defaultSchema={{ ...schema } as InstrumentSchema}>
      <Container />
    </InstrumentSchemaProvider>
  );
};

const Container = () => {
  const { schema } = useInstumentSchemaContext();
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);

  const selectedButton =
    schema?.buttons.find((button) => button.id === selectedButtonId) || null;

  const setSelectedButton = (button: InstrumentButtonSchema | null) => {
    setSelectedButtonId(button?.id || null);
  };
  return (
    <VStack spacing={4} background={"gray.100"} minHeight={"100vh"}>
      <Topbar setSelectedButton={setSelectedButton} />
      <HStack spacing={4} alignItems={"top"} px={2}>
        <Sidebar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        <DraggableGrid
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </HStack>
    </VStack>
  );
};

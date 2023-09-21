import { Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo-with-title.svg";
import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";
import { useInstrumentSchemas } from "@/hooks/useInstrumentSchemas";
import { SelectInstrumentSchema } from "./SelectInstrumentSchema";
import { useInstrumentAudioSampler } from "@/hooks/useInstrumentAudioSampler";
import { InstrumentPiano } from "../InstrumentPiano/InstrumentPiano";
import { InstrumentRender } from "../InstrumentRender/InstrumentRender";

import { InstrumentSchemaProvider } from "@/contexts/InstrumentSchemaContext";
import { useInstumentSchemaContext } from "@/hooks/useInstrumentSchemaContext";

export const PageHome = () => {
  const instrumentSchemas = useInstrumentSchemasStore(
    (state) => state.instrumentSchemas
  );
  const schemaId = useInstrumentSchemasStore(
    (state) => state.selectedInstrumentSchemaId
  );
  const schema = instrumentSchemas.find((schema) => schema.id === schemaId);

  return (
    <InstrumentSchemaProvider defaultSchema={schema || instrumentSchemas[0]}>
      <Content />
    </InstrumentSchemaProvider>
  );
};

export const Content = () => {
  const navigate = useNavigate();
  const deleteSchema = useInstrumentSchemasStore((state) => state.delete);
  const createSchema = useInstrumentSchemasStore((state) => state.create);
  const { schema: instrumentSchema, setSchema: setInstrumentSchema } =
    useInstumentSchemaContext();

  const { isSystemInstrumentSchema, defaultInstrumentSchema } =
    useInstrumentSchemas();

  //useInstrumentAudioSampler(activeInstrument || defaultInstrument);

  const remove = () => {
    if (!instrumentSchema) return;
    deleteSchema(instrumentSchema);
    setInstrumentSchema(defaultInstrumentSchema);
  };

  const edit = () => {
    if (isSystemInstrumentSchema(instrumentSchema)) {
      //make a copy of the system instrument
      const id = Math.random().toString(36).replace("0.", "");

      createSchema({
        ...instrumentSchema,
        id,
        name: instrumentSchema.name + " (copy)",
      });

      return navigate(`/edit/${id}`);
    }

    navigate(`/edit/${instrumentSchema.id}`);
  };

  return (
    <Box h="100dvh">
      <Box background={"gray.100"} p={3}>
        <Image src={logoImage} alt="logo" h={"32px"} />
      </Box>

      <Box
        background={"gray.100"}
        borderBottomRightRadius={40}
        borderBottomLeftRadius={40}
        p={4}
        mb={4}
      >
        <Card p={3} mb={5}>
          <HStack>
            <FormControl>
              <FormLabel>Instrument</FormLabel>
              <SelectInstrumentSchema />
            </FormControl>
            <FormControl>
              <FormLabel style={{ opacity: 0 }}>Controls</FormLabel>
              <HStack>
                <Button onClick={edit}>Edit</Button>
                {!isSystemInstrumentSchema(instrumentSchema) && (
                  <Button onClick={remove}>Delete</Button>
                )}
              </HStack>
            </FormControl>
          </HStack>
        </Card>
        {instrumentSchema && (
          <InstrumentRender instrumentSchema={instrumentSchema} />
        )}
      </Box>
      {instrumentSchema && (
        <InstrumentPiano instrumentSchema={instrumentSchema} />
      )}
    </Box>
  );
};

import { Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo-with-title.svg";
import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";
import { useInstrumentSchemas } from "@/hooks/useInstrumentSchemas";
import { SelectInstrumentSchema } from "./SelectInstrumentSchema";
import { useSampler } from "@/hooks/useTone";
import C4 from "@/assets/C4.mp3";
import A4 from "@/assets/A4.mp3";

import { Piano } from "../Piano/Piano";
import { InstrumentRender } from "../InstrumentRender/InstrumentRender";
import { Note } from "tonal";
import { InstrumentSchemaProvider } from "@/contexts/InstrumentSchemaContext";
import { useInstumentSchemaContext } from "@/hooks/useInstrumentSchemaContext";
import { ActiveButtonsProvider } from "@/contexts/ActiveButtonsContext";
import { useActiveButtonsContext } from "@/hooks/useActiveButtonsContext";
import { useActiveButtonsContextShortcutListener } from "@/hooks/useActiveButtonsContextShortcutListener";
import { useActiveButtonsContextNoteChanges } from "@/hooks/useActiveButtonsContextNoteChanges";

export const PageHome = () => {
  const { instrumentSchemas } = useInstrumentSchemas();

  const schemaId = useInstrumentSchemasStore(
    (state) => state.selectedInstrumentSchemaId
  );
  const schema = instrumentSchemas.find((schema) => schema.id === schemaId);

  return (
    <InstrumentSchemaProvider defaultSchema={schema || instrumentSchemas[0]}>
      <ActiveButtonsProvider>
        <Content />
      </ActiveButtonsProvider>
    </InstrumentSchemaProvider>
  );
};

export const Content = () => {
  const sampler = useSampler({
    C4,
    A4,
  });

  const {
    buttons: activeButtons,
    add: addActiveButton,
    remove: removeActiveButton,
  } = useActiveButtonsContext();

  const navigate = useNavigate();
  const deleteSchema = useInstrumentSchemasStore((state) => state.delete);
  const createSchema = useInstrumentSchemasStore((state) => state.create);
  const { schema: instrumentSchema, setSchema: setInstrumentSchema } =
    useInstumentSchemaContext();

  const { isSystemInstrumentSchema, defaultInstrumentSchema } =
    useInstrumentSchemas();

  useActiveButtonsContextShortcutListener(instrumentSchema.buttons);
  useActiveButtonsContextNoteChanges((changes) => {
    changes.forEach((state) => {
      if (state.action === "start") sampler.triggerAttack(state.note);
      if (state.action === "end") sampler.triggerRelease(state.note);
    });
  });
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

  if (!instrumentSchema) return null;

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

        <InstrumentRender
          instrumentSchema={instrumentSchema}
          activeButtons={activeButtons}
          onPointerDown={addActiveButton}
          onPointerLost={removeActiveButton}
        />
      </Box>

      <Piano
        onKeyPress={(note) => {
          instrumentSchema.buttons.forEach((button) => {
            if (Note.midi(button.note || "") !== Note.midi(note)) return;
            addActiveButton(button);
          });
        }}
        onKeyRelease={(note) => {
          instrumentSchema.buttons.forEach((button) => {
            if (Note.midi(button.note || "") !== Note.midi(note)) return;
            removeActiveButton(button);
          });
        }}
        notes={instrumentSchema.buttons.map((s) => s.note)}
        activeNotes={activeButtons.map((button) => button.note)}
      />
    </Box>
  );
};

import { useInstrumentsStore } from "@/stores/instruments";
import { Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { FormControl, FormLabel, Select, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo-with-title.svg";
import { InstrumentRender } from "../InstrumentRender/InstrumentRender";
import { useActiveInstrument } from "@/hooks/useActiveInstrument";
import { useInstruments } from "@/hooks/useInstruments";
import { useInstrumentAudioSampler } from "@/hooks/useInstrumentAudioSampler";
import { InstrumentPiano } from "../InstrumentPiano/InstrumentPiano";
export const PageHome = () => {
  const navigate = useNavigate();
  const createInsument = useInstrumentsStore((state) => state.create);
  const deleteInstrument = useInstrumentsStore((state) => state.delete);
  const {
    customInstruments,
    systemInstruments,
    isSystemInstrument,
    instruments,
    defaultInstrument,
  } = useInstruments();
  const { instrument: activeInstrument, setActive } = useActiveInstrument();

  useInstrumentAudioSampler(activeInstrument || defaultInstrument);

  if (!activeInstrument) return null;

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
              <Select
                value={activeInstrument?.id}
                onChange={(e) => {
                  //change active instrument
                  e.preventDefault();
                  const id = e.target.value;
                  const instrument = instruments.find(
                    (instrument) => instrument.id === id
                  );
                  if (!instrument) return;
                  setActive(instrument);
                }}
              >
                {systemInstruments.map((instrument) => {
                  return (
                    <option key={instrument.id} value={instrument.id}>
                      {instrument.name}
                    </option>
                  );
                })}

                {customInstruments.length > 0 && (
                  <optgroup label="Custom Instruments">
                    {customInstruments.map((instrument) => {
                      return (
                        <option key={instrument.id} value={instrument.id}>
                          {instrument.name}
                        </option>
                      );
                    })}
                  </optgroup>
                )}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel style={{ opacity: 0 }}>Controls</FormLabel>
              <HStack>
                <Button
                  onClick={() => {
                    if (isSystemInstrument(activeInstrument)) {
                      //make a copy of the system instrument
                      const id = Math.random().toString(36).replace("0.", "");
                      createInsument({
                        ...activeInstrument,
                        id,
                        name: activeInstrument.name + " (copy)",
                      });
                      return navigate(`/edit/${id}`);
                    }

                    //edit the instrument
                    navigate(`/edit/${activeInstrument.id}`);
                  }}
                >
                  Edit
                </Button>
                {!isSystemInstrument(activeInstrument) && (
                  <Button
                    onClick={() => {
                      setActive(defaultInstrument);
                      deleteInstrument(activeInstrument.id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </HStack>
            </FormControl>
          </HStack>
        </Card>
        {activeInstrument && <InstrumentRender instrument={activeInstrument} />}
      </Box>
      {activeInstrument && <InstrumentPiano instrument={activeInstrument} />}
    </Box>
  );
};

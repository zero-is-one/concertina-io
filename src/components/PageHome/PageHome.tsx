import { useInstrumentsStore } from "@/stores/instruments";
import { Box, Button, Card, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo-with-title.svg";
import { InstrumentRender } from "../InstrumentRender/InstrumentRender";

export const PageHome = () => {
  const navigate = useNavigate();
  const createInsument = useInstrumentsStore((state) => state.create);
  const instruments = useInstrumentsStore((state) => state.instruments);

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
        <Card p={3} mb={5}></Card>
        <InstrumentRender />
      </Box>

      {instruments.map((instrument) => {
        return (
          <div key={instrument.id}>
            <Button
              onClick={() => {
                navigate(`/edit/${instrument.id}`);
              }}
            >
              {instrument.name}
            </Button>
          </div>
        );
      })}

      <Button
        onClick={() => {
          const id = Math.random().toString(36).replace("0.", "");
          createInsument({
            id,
            name: generateDrSeussInstrument(),
            buttons: [],
          });
          navigate(`/edit/${id}`);
        }}
      >
        Create
      </Button>
    </Box>
  );
};

function generateDrSeussInstrument() {
  const prefixes = [
    "Fizzle",
    "Bizzle",
    "Blimp",
    "Quirk",
    "Zobbl",
    "Flap",
    "Zing",
    "Zap",
  ];
  const middleParts = ["a", "o", "ee", "oo", "u"];
  const suffixes = [
    "phone",
    "doodle",
    "flute",
    "whistle",
    "harp",
    "horn",
    "rian",
  ];

  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomMiddle =
    middleParts[Math.floor(Math.random() * middleParts.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  const instrumentName = randomPrefix + randomMiddle + randomSuffix;

  return instrumentName;
}

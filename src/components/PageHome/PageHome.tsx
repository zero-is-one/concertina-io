import { useInstrumentsStore } from "@/stores/instruments";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PageHome = () => {
  const navigate = useNavigate();
  const createInsument = useInstrumentsStore((state) => state.create);
  const instruments = useInstrumentsStore((state) => state.instruments);

  return (
    <div>
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
    </div>
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

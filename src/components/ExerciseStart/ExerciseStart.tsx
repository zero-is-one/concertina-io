import { resetAtom as resetTimerAtom } from "@/atoms/timer";
import { exercises } from "@/exercises";
import { atom, useSetAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { GameSettingsPanel } from "../GameSettingsPanel/GameSettingsPanel";

export const ExerciseStart = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const resetTimer = useSetAtom(resetTimerAtom);
  const exercise = exercises.find((exercise) => exercise.id === exerciseId);
  const dispatchStartAtom = useSetAtom(
    exercise?.dispatchStartAtom || atom(false),
  );

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return (
    <GameSettingsPanel
      title={exercise.name}
      onSubmit={async (values) => {
        await dispatchStartAtom(values);
        resetTimer();
        navigate(`/exercise/${exerciseId}/play`);
      }}
    />
  );
};

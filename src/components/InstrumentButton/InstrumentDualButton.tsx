import styled from "@emotion/styled";
import { InstrumentButton } from "./InstrumentButton";

const TopButton = styled(InstrumentButton)`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 100%;
  border-top-left-radius: 40%;

  margin-bottom: 4px;
  width: 100%;
  aspect-ratio: 2/1;
`;

const BottomButton = styled(InstrumentButton)`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;

  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 40%;

  width: 100%;
  aspect-ratio: 2/0.9;
`;

export const InstrumentDualButton = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 100 }}>
      <TopButton>A</TopButton>
      <BottomButton>B</BottomButton>
    </div>
  );
};

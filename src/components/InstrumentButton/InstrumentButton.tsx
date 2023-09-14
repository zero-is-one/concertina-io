import styled from "@emotion/styled";

export const InstrumentButton = styled.button`
  font-family: "Jost", sans-serif;
  user-select: none;
  font-size: 170%;
  //box-shadow: inset 0 0 5px 0 rgba(255, 255, 255, 0.5);
  transition: 0.1s ease-out;
  height: 100%;
  width: 100%;
  max-width: 100px;
  max-height: 100px;
  border-radius: 1000px;
  aspect-ratio: 1/1;
  text-shadow: 0px -1px 1px rgba(255, 255, 255, 0.5);

  margin-bottom: 6px;

  border-width: 1px;
  border-style: solid;
  border-left-color: #777;
  border-right-color: #777;
  border-top-color: #999;
  border-bottom: 4px solid #555;

  background-color: #f1f1f1;
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.2));
  background-image: -webkit-linear-gradient(
    top,
    transparent,
    rgba(0, 0, 0, 0.2)
  );
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.2));
  background-image: -ms-linear-gradient(top, transparent, rgba(0, 0, 0, 0.2));
  background-image: linear-gradient(top, transparent, rgba(0, 0, 0, 0.2));

  color: #444;

  &:hover {
    color: #333;
    background-image: linear-gradient(top, transparent, rgba(0, 0, 0, 0.17));
  }

  &:active,
  .active {
    //border: 0px solid #999;
    background-image: none;
    border-color: #1f883d;
    background-color: #1f883d;
    color: white;
    transform: translateY(4px);
  }

  /* cursor: grab;
  &.react-draggable-dragging {
    cursor: grabbing;
  } */
`;

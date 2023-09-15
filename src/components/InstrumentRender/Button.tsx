import styled from "@emotion/styled";
import { InstrumentButtonFormat } from "@/types";

export const Button = styled.button<{ format: InstrumentButtonFormat }>`
  font-family: "Jost", sans-serif;
  user-select: none;
  font-size: 1.6cqw;
  //box-shadow: inset 0 0 5px 0 rgba(255, 255, 255, 0.5);
  transition: 0.1s ease-out;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 1000px;

  text-shadow: 0px -1px 1px rgba(255, 255, 255, 0.5);

  margin-bottom: 6px;

  border-width: 1px;
  border-style: solid;
  border-left-color: #777;
  border-right-color: #777;
  border-top-color: #999;
  border-bottom: 0.3cqw solid #555;

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

  ${(props) =>
    props.format === "halfCircleBottom" &&
    `
    padding-top: .4cqw;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 1000px;
    border-top-left-radius: 1000px;
  `}

  ${(props) =>
    props.format === "halfCircleTop" &&
    `    
    padding-bottom: .2cqw;
    border-bottom-left-radius: 1000px;
    border-bottom-right-radius: 1000px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  `}

  

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
    padding-top: 0.6cqw;
    //transform: translateY(4px);
  }
`;

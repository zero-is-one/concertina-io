import styled from "@emotion/styled";
import { InstrumentButtonFormat } from "@/types";

export const Button = styled.button<{
  shape: InstrumentButtonFormat;
  active?: boolean;
}>`
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

  background: linear-gradient(to bottom, #dfdfdf 30%, #ffffff 100%);
  color: #444;

  ${(props) =>
    props.shape === "halfCircleTop" &&
    `
    padding-top: .4cqw;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 1000px;
    border-top-left-radius: 1000px;
  `}

  ${(props) =>
    props.shape === "topRightRounded" &&
    `
    padding-top: .4cqw;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 1000px;
    border-top-left-radius: 0;
  `}

  ${(props) =>
    props.shape === "topLeftRounded" &&
    `
    padding-top: .4cqw;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0;
    border-top-left-radius: 1000px;
  `}

  ${(props) =>
    props.shape === "halfCircleBottom" &&
    `    
    padding-bottom: .2cqw;
    border-bottom-left-radius: 1000px;
    border-bottom-right-radius: 1000px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  `}

  ${(props) =>
    props.shape === "bottomRightRounded" &&
    `    
      padding-bottom: .2cqw;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 1000px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    `}

    ${(props) =>
    props.shape === "bottomLeftRounded" &&
    `    
      padding-bottom: .2cqw;
      border-bottom-left-radius: 1000px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    `}
  

  &:hover {
    color: #333;
    background-image: linear-gradient(top, transparent, rgba(0, 0, 0, 0.17));
  }

  &:active,
  &.active {
    //border: 0px solid #999;
    ${() =>
      buttonPressCss}//transform: translateY(4px);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  }

  ${(props) => props.active && buttonPressCss}
`;

const buttonPressCss = `    
background-image: none;
border-color: #1f883d;
background-color: #1f883d;
color: white;
padding-top: 0.6cqw;
`;

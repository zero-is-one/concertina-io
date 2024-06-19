import {
  AngloConcertinaButtonMarker,
  indexToCooverNotationMap,
} from "@/concertinas";

export const CooverFingeringChart = (
  buttonMarker: AngloConcertinaButtonMarker,
) => {
  const { index, action } = buttonMarker;
  const label = indexToCooverNotationMap[index];
  const isLeftHand = Math.floor(index / 5) % 2 === 0;

  const pathStyle1: React.CSSProperties = {
    fill: "#000000",
    strokeWidth: "7.64634",
    strokeLinecap: "round",
    paintOrder: "stroke fill markers",
    stopColor: "#000000",
  };

  const textStyle: React.CSSProperties = {
    fontStyle: "normal",
    fontVariant: "normal",
    fontStretch: "normal",
    fontSize: "36.8274px",
    lineHeight: "125%",
    fontFamily: "Arial",
    letterSpacing: "0px",
    wordSpacing: "0px",
    fill: "#000000",
    stroke: "none",
    strokeWidth: "0.920688px",
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    strokeOpacity: "1",
    textAnchor: "middle",
    fontWeight: "bold",
  };

  const pathStyle2: React.CSSProperties = {
    fill: "#000000",
    strokeWidth: "5.39845",
    strokeLinecap: "round",
    paintOrder: "stroke fill markers",
    stopColor: "#000000",
  };

  const pathStyle3: React.CSSProperties = {
    fill: "#000000",
    strokeWidth: "7.64633",
    strokeLinecap: "round",
    paintOrder: "stroke fill markers",
    stopColor: "#000000",
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 250">
      <path
        d="M105.59 342.482h85.99v2.646h-85.99z"
        style={pathStyle1}
        transform="translate(-98.584 -212.637)"
      />
      {isLeftHand && (
        <text
          xmlSpace="preserve"
          x="148"
          y="450.83"
          style={textStyle}
          transform="translate(-98.584 -212.637)"
        >
          {label}
        </text>
      )}
      {!isLeftHand && (
        <text
          xmlSpace="preserve"
          x="148"
          y="264.559"
          style={textStyle}
          transform="translate(-98.584 -212.637)"
        >
          {label}
        </text>
      )}

      {action === "pull" && (
        <path
          d="M127.153 224.445h42.862v2.646h-42.862z"
          style={pathStyle2}
          transform="translate(-98.584 -212.637)"
        />
      )}
      <path
        d="M105.59 358.759h85.99v2.646h-85.99z"
        style={pathStyle1}
        transform="translate(-98.584 -212.637)"
      />
      <path
        d="M105.59 375.036h85.99v2.646h-85.99z"
        style={pathStyle3}
        transform="translate(-98.584 -212.637)"
      />
      <path
        d="M105.59 326.204h85.99v2.646h-85.99zM105.59 309.927h85.99v2.646h-85.99z"
        style={pathStyle1}
        transform="translate(-98.584 -212.637)"
      />
      <path
        d="m142.073 350.114 13.022-13.022M155.095 350.114l-13.022-13.022"
        style={{
          fill: "none",
          fillRule: "evenodd",
          stroke: "#000000",
          strokeWidth: "2.6934px",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeOpacity: "1",
        }}
        transform="translate(-98.584 -212.637)"
      />
    </svg>
  );
};

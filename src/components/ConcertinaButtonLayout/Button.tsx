import noteButtonHalfBgImage from "@/assets/noteButtonHalf.svg";
console.log(noteButtonHalfBgImage);

const textStyles = {
  fontFamily: `'Jost', sans-serif`,
  fill: "white",
  x: "50%",
  y: "30%",
  dominantBaseline: "middle",
  textAnchor: "middle",
  fontSize: "170%",
};

export const Button = ({
  pullText,
  pushText,
  keyCode,
}: {
  pullText: string;
  pushText: string;
  keyCode: string;
}) => {
  return (
    <div style={{ width: "100%", padding: 6 }}>
      <svg
        style={{ width: "100%" }}
        overflow="visible"
        viewBox="0 0 106.48 92.52"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style={{ fill: "black" }}
          d="M83.565 18.122c28.209 0 37.03 26.424 53.946 44.673H52.42V49.268c0-17.2 13.944-31.145 31.145-31.146zm32.558 47.848v13.527c0 17.201-13.945 31.146-31.146 31.146-28.208 0-37.03-26.424-53.946-44.673z"
          transform="translate(-31.031 -18.122)"
        />

        <text {...textStyles}>{pushText}</text>
        <text {...{ ...textStyles, y: "75%" }}>{pullText}</text>

        <text
          {...{
            dominantBaseline: "bottom",
            y: "99%",
            x: 0,
            fontFamily: "monospace, monospace",
            fontSize: "180%",
          }}
        >
          {keyCode.replace("enter", "⏎").replace("quote", "‘")}
        </text>
      </svg>
    </div>
  );
};

import { ConcertinaAction } from "@/concertinas";

export const ConcertinaFingeringChart = ({
  action,
}: {
  action: ConcertinaAction;
}) => {
  const { bellows, index } = action;
  const color = bellows === "pull" ? "blue" : "red";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 74">
      {circles.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={10}
          fill={
            i === index
              ? `var(--mantine-color-${color}-7)`
              : "var(--mantine-color-gray-7)"
          }
        />
      ))}
      {bellows === "pull" && (
        <path
          transform="translate(0 7)"
          fill={`var(--mantine-color-${color}-7)`}
          d="M157.152 34.6v30.795a2.31 2.31 0 0 1-4.62 0V52.308h-7.506l2.217 2.215a2.314 2.314 0 0 1-3.272 3.272l-6.159-6.16a2.31 2.31 0 0 1 0-3.271l6.16-6.16a2.314 2.314 0 1 1 3.271 3.273l-2.217 2.211h7.506V34.6a2.31 2.31 0 0 1 4.62 0zm23.96 13.764-6.16-6.16a2.314 2.314 0 0 0-3.271 3.273l2.215 2.211h-7.506V34.6a2.31 2.31 0 0 0-4.62 0v30.795a2.31 2.31 0 0 0 4.62 0V52.308h7.506l-2.217 2.215a2.314 2.314 0 0 0 3.272 3.272l6.159-6.16a2.31 2.31 0 0 0 .002-3.271z"
        />
      )}
      {bellows === "push" && (
        <path
          transform="translate(0 7)"
          fill={`var(--mantine-color-${color}-7)`}
          d="M181.283 34.6v30.795a2.31 2.31 0 0 1-4.619 0V52.308h-7.506l2.217 2.215a2.314 2.314 0 0 1-3.272 3.272l-6.159-6.16a2.31 2.31 0 0 1 0-3.271l6.159-6.16a2.314 2.314 0 0 1 3.272 3.273l-2.217 2.211h7.506V34.6a2.31 2.31 0 0 1 4.62 0zm-24.408 13.764-6.159-6.16a2.314 2.314 0 0 0-3.272 3.273l2.215 2.211h-7.506V34.6a2.31 2.31 0 1 0-4.619 0v30.795a2.31 2.31 0 0 0 4.62 0V52.308h7.505l-2.217 2.215a2.314 2.314 0 0 0 3.272 3.272l6.16-6.16a2.31 2.31 0 0 0 .001-3.271z"
        />
      )}
    </svg>
  );
};

const circles = [
  [35.342, 14.106],
  [60.982, 14.106],
  [86.621, 14.106],
  [112.261, 14.106],
  [137.901, 14.106],
  [180.161, 14.916],
  [205.8, 14.916],
  [231.44, 14.916],
  [257.079, 14.916],
  [282.719, 14.916],
  [22.327, 36.939],
  [47.967, 36.939],
  [73.606, 36.939],
  [99.246, 36.939],
  [124.885, 36.939],
  [193.136, 36.931],
  [218.776, 36.931],
  [244.415, 36.931],
  [270.055, 36.931],
  [295.694, 36.931],
  [11.945, 59.592],
  [37.584, 59.592],
  [63.224, 59.592],
  [88.864, 59.592],
  [114.503, 59.592],
  [206.865, 59.906],
  [232.505, 59.906],
  [258.144, 59.906],
  [283.784, 59.906],
  [309.423, 59.906],
];
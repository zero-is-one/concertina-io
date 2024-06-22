import "@fontsource-variable/dm-sans";
import { Input, Paper, createTheme } from "@mantine/core";

export const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: "'DM Sans Variable', sans-serif",
  headings: {
    fontWeight: "bold",
  },
  components: {
    Paper: Paper.extend({
      defaultProps: {
        shadow: "sm",
        radius: 0,
      },
    }),
    InputLabel: Input.Label.extend({
      defaultProps: {
        // fw: 500,
        // bg: "red",
        mb: 4,
      },
    }),
  },
});

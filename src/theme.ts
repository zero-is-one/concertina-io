import { Input, createTheme } from "@mantine/core";

export const theme = createTheme({
  /** Put your mantine theme override here */
  components: {
    InputLabel: Input.Label.extend({
      defaultProps: {
        // fw: 500,
        // bg: "red",
        mb: 4,
      },
    }),
  },
});

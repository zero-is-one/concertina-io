import { Stack, StackProps } from "@mantine/core";
import { ReactNode } from "react";

export const FullscreenLayout = ({
  children,
  ...props
}: StackProps & { children: ReactNode }) => {
  return (
    <Stack w="100dvw" h="100dvh" justify="center" align="center" {...props}>
      {children}
    </Stack>
  );
};

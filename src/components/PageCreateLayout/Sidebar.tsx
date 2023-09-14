import {
  Box,
  FormControl,
  Switch,
  FormLabel,
  Input,
  Divider,
  Card,
} from "@chakra-ui/react";

export const Sidebar = () => {
  return (
    <Box width={180} mt={"60px"}>
      <FormControl mb={3} display="flex" alignItems="center">
        <FormLabel>Push/Pull Button?</FormLabel>
        <Switch id="email-alerts" />
      </FormControl>

      <Divider />

      <ButtonSettings />
      <ButtonSettings />
    </Box>
  );
};

export const ButtonSettings = () => {
  return (
    <Card p={2} mb={2}>
      <FormControl mb={3}>
        <FormLabel>Music Note</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Label</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Keyboard Shortcut</FormLabel>
        <Input type="text" />
      </FormControl>
    </Card>
  );
};

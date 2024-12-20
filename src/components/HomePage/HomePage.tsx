import { exercises } from "@/exercises";
import { FullscreenLayout } from "@/layouts/FullscreenLayout";
import {
  Anchor,
  Card,
  Center,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <FullscreenLayout justify="flex-start">
      <Container py="sm">
        <Center>
          <Stack gap={"lg"}>
            <Stack gap={0}>
              <Title ta={"center"} order={4}>
                CONCERTINA.io
              </Title>
              <Text ta={"center"}>A web app for learning the concertina</Text>
            </Stack>

            {exercises.map((game) => (
              <Panel
                key={game.id}
                title={game.name}
                description="Learn the concertina using the Coover Notation System"
                link={`/exercise/${game.id}/start`}
                imgSrc={game.iconImgSrc}
              />
            ))}

            <Text ta="center" c="dimmed">
              v. 2RZJ80
            </Text>
          </Stack>
        </Center>
      </Container>
    </FullscreenLayout>
  );
};

export const Panel = ({
  title,
  description,
  link,
  imgSrc,
}: {
  title: string;
  description: string;
  link: string;
  imgSrc: string;
}) => {
  return (
    <Anchor component={Link} to={link}>
      <Group justify="space-between" w={"100%"} maw={400}>
        <Card withBorder radius="md" p={0}>
          <Image src={imgSrc} height={100} />
        </Card>

        <Stack gap="0" flex={1}>
          <Title order={3}>{title}</Title>
          <Text>{description}</Text>
        </Stack>
      </Group>
    </Anchor>
  );
};

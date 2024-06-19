import { exercises } from "@/exercises";
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
    <Container py="sm">
      <Center>
        <Stack gap="xs">
          <Title ta={"center"} order={4}>
            Concertina.io
          </Title>
          <Title ta={"center"} order={5}>
            A web app for learning the concertina
          </Title>

          {exercises.map((game) => (
            <Panel
              key={game.id}
              title={game.name}
              description="Learn the concertina using the Coover Notation System"
              link={`/exercise/${game.id}/start`}
              imgSrc={game.iconImgSrc}
            />
          ))}
        </Stack>
      </Center>
    </Container>
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
      <Group justify="space-between" w={"100%"}>
        <Card withBorder radius="md" p={0}>
          <Image src={imgSrc} height={100} />
        </Card>

        <Stack gap="0" flex={1}>
          <Title order={6}>{title}</Title>
          <Text>{description}</Text>
        </Stack>
      </Group>
    </Anchor>
  );
};
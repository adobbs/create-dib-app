'use client';

import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Button,
  Group,
  Badge,
  Code,
} from '@mantine/core';
import { Plus, BookOpen } from 'lucide-react';

export default function Dashboard() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title order={1} mb="xs">
            🎨 Prototype Dashboard
          </Title>
          <Text c="dimmed" size="lg">
            Welcome to your prototype workspace! Start by creating your first
            prototype.
          </Text>
        </div>

        {/* Getting Started Card */}
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack gap="md">
            <Group>
              <BookOpen size={24} />
              <Title order={3}>Getting Started</Title>
            </Group>

            <Text>
              This is your prototype dashboard. You can add prototypes by creating
              new folders in the <Code>src/app/</Code> directory.
            </Text>

            <div>
              <Text fw={500} mb="xs">
                Quick example:
              </Text>
              <Paper bg="gray.0" p="md" radius="sm">
                <Stack gap="xs">
                  <Code block>mkdir -p src/app/my-prototype</Code>
                  <Code block>touch src/app/my-prototype/page.tsx</Code>
                </Stack>
              </Paper>
            </div>

            <Text size="sm" c="dimmed">
              Then visit{' '}
              <Code>/my-prototype</Code> to see your new
              prototype!
            </Text>
          </Stack>
        </Paper>

        {/* Placeholder for future prototypes */}
        <Paper shadow="sm" p="xl" radius="md" withBorder style={{
          borderStyle: 'dashed',
          borderColor: 'var(--mantine-color-gray-3)',
          backgroundColor: 'var(--mantine-color-gray-0)',
        }}>
          <Stack align="center" gap="md" py="xl">
            <Plus size={48} strokeWidth={1.5} color="var(--mantine-color-gray-5)" />
            <div style={{ textAlign: 'center' }}>
              <Text fw={500} size="lg" mb="xs">
                No prototypes yet
              </Text>
              <Text c="dimmed" size="sm">
                Create your first prototype to see it listed here
              </Text>
            </div>
            <Badge variant="light" size="lg">
              Ready to prototype!
            </Badge>
          </Stack>
        </Paper>

        {/* Resources */}
        <Paper shadow="xs" p="md" radius="md" bg="blue.0">
          <Stack gap="sm">
            <Text fw={500} size="sm">
              📚 Helpful Resources:
            </Text>
            <Group gap="md">
              <Text size="sm" component="a" href="https://nextjs.org/docs" target="_blank" c="blue.7">
                Next.js Docs
              </Text>
              <Text size="sm" component="a" href="https://mantine.dev/" target="_blank" c="blue.7">
                Mantine UI
              </Text>
              <Text size="sm" component="a" href="https://zustand-demo.pmnd.rs/" target="_blank" c="blue.7">
                Zustand
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

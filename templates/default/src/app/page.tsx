'use client';

import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  SimpleGrid,
  Code,
} from '@mantine/core';
import { BookOpen } from 'lucide-react';
import { DashboardCard, PrototypeInfo } from '@/components/DashboardCard';

/**
 * Prototype Registry
 *
 * Add your prototypes here to display them on the dashboard.
 * Each prototype should have:
 * - id: unique identifier
 * - title: display name
 * - description: what this prototype demonstrates
 * - path: route path (e.g., '/checkout-demo')
 * - tags: array of relevant tags
 * - status: 'stable', 'beta', or 'experimental'
 */
const PROTOTYPES: PrototypeInfo[] = [
  {
    id: 'checkout-demo',
    title: 'Checkout Flow',
    description:
      'Multi-step checkout process with cart, shipping, and payment steps',
    path: '/checkout-demo',
    tags: ['e-commerce', 'multi-step', 'forms'],
    status: 'stable',
  },
  {
    id: 'profile-editor',
    title: 'Profile Editor',
    description: 'User profile form with validation and error handling',
    path: '/profile-editor',
    tags: ['forms', 'validation', 'user profile'],
    status: 'stable',
  },
];

export default function Dashboard() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title order={1} mb="xs">
            Prototype Dashboard
          </Title>
          <Text c="dimmed" size="lg">
            Explore example prototypes with switchable data scenarios
          </Text>
        </div>

        {/* Prototypes Grid */}
        <div>
          <Text fw={600} size="lg" mb="md">
            Example Prototypes
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {PROTOTYPES.map((prototype) => (
              <DashboardCard key={prototype.id} prototype={prototype} />
            ))}
          </SimpleGrid>
        </div>

        {/* Getting Started Card */}
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack gap="md">
            <Group>
              <BookOpen size={24} />
              <Title order={3}>Add Your Own Prototypes</Title>
            </Group>

            <Text>
              Create new prototypes by adding folders in the{' '}
              <Code>src/app/</Code> directory. Then register them in the{' '}
              <Code>PROTOTYPES</Code> array above.
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
              Then add it to the <Code>PROTOTYPES</Code> array in{' '}
              <Code>src/app/page.tsx</Code> to display it on the dashboard.
            </Text>
          </Stack>
        </Paper>

        {/* Resources */}
        <Paper shadow="xs" p="md" radius="md" bg="blue.0">
          <Stack gap="sm">
            <Text fw={500} size="sm">
              Helpful Resources:
            </Text>
            <Group gap="md">
              <Text
                size="sm"
                component="a"
                href="https://nextjs.org/docs"
                target="_blank"
                c="blue.7"
              >
                Next.js Docs
              </Text>
              <Text
                size="sm"
                component="a"
                href="https://mantine.dev/"
                target="_blank"
                c="blue.7"
              >
                Mantine UI
              </Text>
              <Text
                size="sm"
                component="a"
                href="https://zustand-demo.pmnd.rs/"
                target="_blank"
                c="blue.7"
              >
                Zustand
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

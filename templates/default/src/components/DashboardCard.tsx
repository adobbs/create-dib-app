import { Card, Text, Badge, Group, Stack, Button } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface PrototypeInfo {
  id: string;
  title: string;
  description: string;
  path: string;
  tags: string[];
  status?: 'stable' | 'beta' | 'experimental';
}

interface DashboardCardProps {
  prototype: PrototypeInfo;
}

export function DashboardCard({ prototype }: DashboardCardProps) {
  const statusColors = {
    stable: 'green',
    beta: 'blue',
    experimental: 'yellow',
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap="md" style={{ flex: 1 }}>
        <div>
          <Group justify="space-between" mb="xs">
            <Text fw={600} size="lg">
              {prototype.title}
            </Text>
            {prototype.status && (
              <Badge color={statusColors[prototype.status]} variant="light" size="sm">
                {prototype.status}
              </Badge>
            )}
          </Group>
          <Text size="sm" c="dimmed">
            {prototype.description}
          </Text>
        </div>

        <Group gap="xs">
          {prototype.tags.map((tag) => (
            <Badge key={tag} variant="outline" size="xs">
              {tag}
            </Badge>
          ))}
        </Group>

        <div style={{ marginTop: 'auto' }}>
          <Button
            component={Link}
            href={prototype.path}
            variant="light"
            fullWidth
            rightSection={<ArrowRight size={16} />}
          >
            Open Prototype
          </Button>
        </div>
      </Stack>
    </Card>
  );
}

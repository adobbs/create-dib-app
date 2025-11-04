'use client';

import { Container, Stack, Title, Text, Button, Group } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PrototypeLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PrototypeLayout({
  title,
  description,
  children,
}: PrototypeLayoutProps) {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Button
            component={Link}
            href="/"
            variant="subtle"
            leftSection={<ArrowLeft size={16} />}
            mb="md"
            size="sm"
          >
            Back to Dashboard
          </Button>
          <Title order={1} mb="xs">
            {title}
          </Title>
          <Text c="dimmed">{description}</Text>
        </div>

        {children}
      </Stack>
    </Container>
  );
}

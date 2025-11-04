'use client';

import { Group, Select, Button, Paper, Text } from '@mantine/core';
import { RotateCcw } from 'lucide-react';
import { Scenario } from '@/types';
import { scenarios } from '@/lib/scenarios';

interface PrototypeToolbarProps {
  currentScenario: Scenario;
  onScenarioChange: (scenario: Scenario) => void;
  onReset: () => void;
}

export function PrototypeToolbar({
  currentScenario,
  onScenarioChange,
  onReset,
}: PrototypeToolbarProps) {
  const scenarioOptions = Object.values(scenarios).map((scenario) => ({
    value: scenario.id,
    label: scenario.name,
  }));

  return (
    <Paper shadow="xs" p="md" mb="lg" withBorder>
      <Group justify="space-between">
        <Group gap="md">
          <Text size="sm" fw={500} c="dimmed">
            Data Scenario:
          </Text>
          <Select
            value={currentScenario}
            onChange={(value) => onScenarioChange(value as Scenario)}
            data={scenarioOptions}
            style={{ width: 200 }}
          />
        </Group>
        <Button
          variant="light"
          color="gray"
          leftSection={<RotateCcw size={16} />}
          onClick={onReset}
        >
          Reset
        </Button>
      </Group>
      <Text size="xs" c="dimmed" mt="xs">
        {scenarios[currentScenario].description}
      </Text>
    </Paper>
  );
}

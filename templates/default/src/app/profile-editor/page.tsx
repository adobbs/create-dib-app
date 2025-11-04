'use client';

import { useEffect } from 'react';
import {
  Stack,
  TextInput,
  Textarea,
  Button,
  Avatar,
  Group,
  Paper,
  Alert,
} from '@mantine/core';
import { CheckCircle } from 'lucide-react';
import { PrototypeLayout } from '@/components/PrototypeLayout';
import { PrototypeToolbar } from '@/components/PrototypeToolbar';
import { useProfileStore } from '@/stores/useProfileStore';
import { Scenario } from '@/types';
import { useState } from 'react';

export default function ProfileEditorPage() {
  const {
    scenario,
    profile,
    isDirty,
    isSaving,
    errors,
    setScenario,
    updateProfile,
    saveProfile,
    reset,
  } = useProfileStore();

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Initialize with normal scenario on mount
    setScenario('normal');
  }, [setScenario]);

  const handleScenarioChange = (newScenario: Scenario) => {
    setScenario(newScenario);
    setShowSuccess(false);
  };

  const handleSave = async () => {
    await saveProfile();
    if (Object.keys(errors).length === 0) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleReset = () => {
    reset();
    setShowSuccess(false);
  };

  return (
    <PrototypeLayout
      title="Profile Editor"
      description="Edit user profile information with validation and error handling"
    >
      <PrototypeToolbar
        currentScenario={scenario}
        onScenarioChange={handleScenarioChange}
        onReset={handleReset}
      />

      {showSuccess && (
        <Alert
          icon={<CheckCircle size={16} />}
          title="Success"
          color="green"
          withCloseButton
          onClose={() => setShowSuccess(false)}
        >
          Profile saved successfully!
        </Alert>
      )}

      <Paper shadow="sm" p="xl" withBorder>
        <Stack gap="lg">
          <Group>
            <Avatar src={profile.avatar} size={80} radius="md" />
            <div>
              <TextInput
                label="Avatar URL"
                placeholder="https://..."
                value={profile.avatar}
                onChange={(e) => updateProfile({ avatar: e.target.value })}
              />
            </div>
          </Group>

          <TextInput
            label="Full Name"
            placeholder="Enter your name"
            required
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            error={errors.name}
          />

          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            required
            type="email"
            value={profile.email}
            onChange={(e) => updateProfile({ email: e.target.value })}
            error={errors.email}
          />

          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            minRows={3}
            maxRows={6}
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            error={errors.bio}
          />

          <TextInput
            label="Location"
            placeholder="City, Country"
            value={profile.location}
            onChange={(e) => updateProfile({ location: e.target.value })}
            error={errors.location}
          />

          <TextInput
            label="Website"
            placeholder="https://yourwebsite.com"
            value={profile.website}
            onChange={(e) => updateProfile({ website: e.target.value })}
            error={errors.website}
          />

          <TextInput
            label="Company"
            placeholder="Your company name"
            value={profile.company}
            onChange={(e) => updateProfile({ company: e.target.value })}
            error={errors.company}
          />

          <Group justify="space-between" mt="md">
            <Button variant="subtle" onClick={handleReset} disabled={!isDirty}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              loading={isSaving}
              disabled={!isDirty}
            >
              Save Profile
            </Button>
          </Group>
        </Stack>
      </Paper>
    </PrototypeLayout>
  );
}

import { create } from 'zustand';
import { Scenario } from '@/types';
import usersData from '@/data/users.json';

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  company: string;
  avatar: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
}

interface ProfileStore {
  // Current state
  scenario: Scenario;
  profile: UserProfile;
  isDirty: boolean;
  isSaving: boolean;
  errors: ValidationErrors;

  // Actions
  setScenario: (scenario: Scenario) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  saveProfile: () => Promise<void>;
  reset: () => void;
  validate: () => boolean;
}

const getProfileForScenario = (scenario: Scenario): UserProfile => {
  return (usersData as Record<Scenario, UserProfile>)[scenario];
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  // Initial state
  scenario: 'normal',
  profile: getProfileForScenario('normal'),
  isDirty: false,
  isSaving: false,
  errors: {},

  // Actions
  setScenario: (scenario) => {
    set({
      scenario,
      profile: getProfileForScenario(scenario),
      isDirty: false,
      errors: {},
    });
  },

  updateProfile: (updates) => {
    set({
      profile: { ...get().profile, ...updates },
      isDirty: true,
      errors: {}, // Clear errors on change
    });
  },

  validate: () => {
    const { profile } = get();
    const errors: ValidationErrors = {};

    // Name validation
    if (!profile.name.trim()) {
      errors.name = 'Name is required';
    } else if (profile.name.length > 100) {
      errors.name = 'Name must be less than 100 characters';
    }

    // Email validation
    if (!profile.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Bio validation
    if (profile.bio.length > 500) {
      errors.bio = 'Bio must be less than 500 characters';
    }

    // Website validation
    if (profile.website && !/^https?:\/\/.+/.test(profile.website)) {
      errors.website = 'Please enter a valid URL (starting with http:// or https://)';
    }

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  saveProfile: async () => {
    if (!get().validate()) {
      return;
    }

    set({ isSaving: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    set({ isSaving: false, isDirty: false });
  },

  reset: () => {
    const { scenario } = get();
    set({
      profile: getProfileForScenario(scenario),
      isDirty: false,
      errors: {},
    });
  },
}));

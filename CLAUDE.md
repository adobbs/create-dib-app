# CLAUDE.md - AI Assistant Guide

> This file provides context for AI assistants (like Claude) working with the create-dib-app project.

## Project Overview

**create-dib-app** is a CLI tool that scaffolds opinionated, batteries-included prototype workspaces. It creates a Next.js monorepo with Mantine UI, Zustand state management, and example prototypes to help developers quickly build high-fidelity prototypes.

**Current Version:** 0.2.0

## Quick Context

- **Language:** TypeScript
- **Framework:** Next.js 16 (App Router)
- **UI Library:** Mantine UI v7
- **State Management:** Zustand
- **Icons:** Lucide React
- **Build Tool:** TypeScript compiler (for CLI), Next.js (for templates)

## Project Structure

```
create-dib-app/
├── src/                    # CLI source code
│   ├── index.ts           # Main CLI entry point
│   ├── prompts.ts         # Interactive prompts
│   └── utils.ts           # Utility functions
├── templates/             # Template files for generated projects
│   └── default/          # Default template
│       ├── src/
│       │   ├── app/              # Next.js App Router pages
│       │   │   ├── page.tsx      # Dashboard homepage
│       │   │   ├── checkout-demo/ # Example: Checkout flow
│       │   │   └── profile-editor/ # Example: Profile editor
│       │   ├── components/        # Shared React components
│       │   │   ├── DashboardCard.tsx
│       │   │   ├── PrototypeLayout.tsx
│       │   │   └── PrototypeToolbar.tsx
│       │   ├── stores/           # Zustand state stores
│       │   │   ├── useCheckoutStore.ts
│       │   │   └── useProfileStore.ts
│       │   └── data/             # Mock JSON data
│       │       └── products.json
│       └── package.json
├── docs/                  # Documentation
│   └── create-dib-app-architecture.md  # Full spec
├── package.json          # CLI package configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Files and Their Purposes

### CLI Files (src/)

- **`src/index.ts`**: Main CLI entry point. Handles command-line arguments, orchestrates project creation.
- **`src/prompts.ts`**: Interactive prompts for project configuration (if implemented).
- **`src/utils.ts`**: Utility functions for file operations, validation, etc.

### Template Files (templates/default/)

- **`src/app/page.tsx`**: Dashboard homepage that lists all prototypes.
- **`src/app/layout.tsx`**: Root layout with Mantine UI provider.
- **`src/components/PrototypeToolbar.tsx`**: Toolbar for switching between data states in prototypes.
- **`src/components/PrototypeLayout.tsx`**: Layout wrapper for individual prototypes.
- **`src/stores/useCheckoutStore.ts`**: Example Zustand store for checkout flow.
- **`src/stores/useProfileStore.ts`**: Example Zustand store for profile editor.
- **`src/data/products.json`**: Mock product data for examples.

## Architecture Patterns

### 1. Monorepo Approach
All prototypes live in a single Next.js app under `src/app/[prototype-name]/`. The dashboard at `/` lists all prototypes.

### 2. State Management
- **Zustand** for all state management
- Session-based state (resets on refresh)
- Each prototype has its own store in `src/stores/`

### 3. Mock Data
- JSON files in `src/data/`
- Imported directly into components or stores
- Type-safe with TypeScript interfaces

### 4. Prototype Structure
Each prototype follows this pattern:
```
src/app/[prototype-name]/
├── page.tsx              # Main prototype page
└── components/           # Prototype-specific components
    ├── ComponentA.tsx
    └── ComponentB.tsx
```

### 5. Prototype Toolbar
- Yellow sticky bar at top of prototypes
- Allows switching between data states (empty, normal, full)
- Reset button to restore initial state
- Not shown on dashboard, only in prototypes

## Common Development Tasks

### Adding a New Prototype Template

1. Create a new folder in `templates/default/src/app/[prototype-name]/`
2. Add `page.tsx` with the prototype component
3. Create a Zustand store in `templates/default/src/stores/use[Name]Store.ts`
4. Add any mock data to `templates/default/src/data/`
5. Update the dashboard in `templates/default/src/app/page.tsx` to include the new prototype

### Modifying the CLI

1. Source code is in `src/`
2. Run `npm run build` to compile TypeScript
3. Test with `node dist/index.js test-project`

### Testing the Generated Project

```bash
# Build CLI
npm run build

# Generate test project
node dist/index.js test-project

# Test the generated project
cd test-project
npm install
npm run dev
```

### Updating Dependencies

**CLI dependencies:**
- Edit `package.json` in root
- Run `npm install`

**Template dependencies:**
- Edit `templates/default/package.json`
- Update the version strings (they're copied to generated projects)

## Important Conventions

### File Naming
- React components: `PascalCase.tsx`
- Zustand stores: `use[Name]Store.ts`
- Utility files: `camelCase.ts`
- Mock data: `kebab-case.json` or `camelCase.json`

### Component Patterns
- Use `'use client'` directive for interactive components
- Mantine UI components for all UI elements
- TypeScript interfaces for all props
- Lucide React for icons

### State Management
```typescript
// Pattern for Zustand stores
import { create } from 'zustand';

interface MyStore {
  data: any[];
  actions: () => void;
}

export const useMyStore = create<MyStore>((set) => ({
  data: [],
  actions: () => set({ /* ... */ }),
}));
```

## Dependencies

### CLI Dependencies
- `commander`: CLI framework
- `chalk`: Terminal colors
- `ora`: Loading spinners
- `prompts`: Interactive prompts
- `fs-extra`: Enhanced file operations
- `validate-npm-package-name`: Package name validation

### Template Dependencies (generated projects)
- `next`: ^16.0.0
- `react`: ^19.0.0
- `@mantine/core`: ^7.14.0
- `@mantine/hooks`: ^7.14.0
- `zustand`: ^5.0.2
- `lucide-react`: ^0.468.0

## Build and Release

### Building
```bash
npm run build  # Compiles TypeScript to dist/
```

### Testing
```bash
npm test       # Runs test command (creates test-project)
```

### Publishing
```bash
npm run prepublishOnly  # Automatically builds before publish
npm publish             # Publishes to npm
```

## Git Workflow

- Main development on `main` branch
- Feature branches: `[username]/[feature-name]`
- PRs merged to `main`
- Semantic versioning: `major.minor.patch`

## Known Issues and Gotchas

1. **Template files are copied, not symlinked**: Changes to templates require rebuilding the CLI.
2. **Next.js App Router**: We're using the App Router (not Pages Router). Components in `app/` directory use file-based routing.
3. **Client Components**: Most interactive components need `'use client'` directive due to Mantine UI and Zustand.
4. **Icon Library**: We switched from `@tabler/icons-react` to `lucide-react` in v0.2.0.

## Recent Changes (v0.2.0)

- ✅ Updated to Next.js 16
- ✅ Switched from Tabler Icons to Lucide React
- ✅ Added checkout-demo example prototype
- ✅ Added profile-editor example prototype
- ✅ Implemented PrototypeToolbar component
- ✅ Added mock data system with products.json
- ✅ Created Zustand stores for examples

## Future Roadmap (v0.3.0)

- [ ] CLI command to add new prototypes: `npx dib add [name]`
- [ ] More example prototypes (dashboard, chat, admin table)
- [ ] Enhanced data scenarios (time-based, role-based)
- [ ] Better TypeScript types for mock data
- [ ] Improved documentation in generated projects

## Working with AI Assistants

### When Making Changes

1. **Always read before editing**: Use Read tool on files before making changes
2. **Build after changes**: Run `npm run build` after modifying CLI source
3. **Test thoroughly**: Create a test project and verify it works
4. **Update docs**: Keep this file and README.md in sync

### Common Requests

**"Add a new feature to the generated template"**
- Modify files in `templates/default/`
- Rebuild CLI with `npm run build`
- Test by generating a new project

**"Update dependencies"**
- For CLI: Update root `package.json`
- For templates: Update `templates/default/package.json`

**"Fix a bug in the CLI"**
- Modify files in `src/`
- Run `npm run build`
- Test with `node dist/index.js test-project`

**"Add a new example prototype"**
- Follow the "Adding a New Prototype Template" pattern above
- Ensure it follows the existing conventions

## Questions or Issues?

- See full documentation: `docs/create-dib-app-architecture.md`
- Check README.md for user-facing documentation
- Review existing examples in `templates/default/src/app/`

---

**Last Updated:** November 4, 2025
**Version:** 0.2.0

# create-dib-app: Opinionated Prototype Stack

> **Version:** 0.1.0 (Draft)  
> **Last Updated:** November 2, 2025  
> **Status:** Design Specification

## Table of Contents

1. [Overview](#overview)
2. [What It Creates](#what-it-creates)
3. [Tech Stack Rationale](#tech-stack-rationale)
4. [Project Structure](#project-structure)
5. [Core Features](#core-features)
6. [CLI Design](#cli-design)
7. [Implementation Plan](#implementation-plan)
8. [Future Enhancements](#future-enhancements)

---

## Overview

**create-dib-app** is a CLI tool that scaffolds an opinionated, batteries-included prototype workspace. Unlike generic starters, it's specifically designed for managing multiple high-fidelity prototypes with realistic data and state management.

### The Pitch

```bash
npx create-dib-app my-prototypes

# Creates a monorepo with:
# - Dashboard homepage listing all prototypes
# - Example prototype with state management
# - Prototype toolbar for demoing different states
# - Mock data patterns
# - Everything configured and ready to code
```

**10 minutes later:** You're building prototypes, not configuring tools.

### Key Differentiators

- **Monorepo approach** - All prototypes in one workspace
- **Built-in dashboard** - Navigate between prototypes easily
- **Prototype toolbar** - Demo different data states without code changes
- **Opinionated stack** - Next.js + Zustand + Mantine (decisions made for you)
- **Example prototypes** - Learn by reference, not documentation

---

## What It Creates

### The Generated Project

```
my-prototypes/
├── README.md                          # Getting started guide
├── package.json                       # Monorepo dependencies
├── next.config.js                     # Next.js configuration
├── tsconfig.json                      # TypeScript config
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout with Mantine
│   │   ├── page.tsx                   # Dashboard homepage
│   │   ├── checkout-demo/             # Example prototype
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   └── profile-editor/            # Another example
│   │       ├── page.tsx
│   │       └── components/
│   ├── components/                    # Shared components
│   │   ├── PrototypeToolbar.tsx       # State switcher toolbar
│   │   ├── PrototypeLayout.tsx        # Layout for prototypes
│   │   └── DashboardCard.tsx          # Dashboard prototype cards
│   ├── stores/                        # Zustand stores
│   │   ├── usePrototypeStore.ts       # Prototype state management
│   │   └── README.md                  # Store patterns
│   ├── data/                          # Mock data
│   │   ├── scenarios.ts               # Different data scenarios
│   │   ├── users.json
│   │   ├── products.json
│   │   └── README.md                  # Data management guide
│   └── lib/
│       └── utils.ts                   # Common utilities
├── public/                            # Static assets
└── docs/
    ├── adding-prototypes.md           # How to add new prototypes
    ├── state-management.md            # Zustand patterns
    └── mock-data.md                   # Data strategies
```

### What You Get Out of the Box

**1. Dashboard Homepage (`/`)**
- Grid of all prototypes
- Status indicators (draft, active, archived)
- Quick links to each prototype
- Search/filter functionality

**2. Example Prototypes**
- Checkout flow demo (`/checkout-demo`)
- Profile editor demo (`/profile-editor`)
- Both fully functional with state management

**3. Prototype Toolbar**
- State switcher (empty, normal, overflow, error states)
- Data scenario selector
- Reset button
- Visible only in prototypes (not on dashboard)

**4. Mock Data System**
- Pre-defined scenarios
- Easy to add new data
- Type-safe with TypeScript
- Realistic examples

**5. State Management**
- Zustand stores configured
- Patterns for prototype state
- Session-based (resets on refresh)
- Example implementations

---

## Tech Stack Rationale

### Next.js 15 (App Router)

**Why:**
- ✅ Industry standard for React apps
- ✅ App Router supports both pages and server components
- ✅ Built-in routing (no react-router needed)
- ✅ Fast Refresh for rapid iteration
- ✅ Easy deployment (Vercel, Netlify)
- ✅ Excellent documentation

**For prototyping:**
- File-based routing = easy to add prototypes
- Server components = fast initial loads
- Client components for interactive prototypes

### Zustand

**Why NOT Context API:**
- ❌ Too much boilerplate
- ❌ Context hell for multiple stores
- ❌ Performance issues with frequent updates

**Why NOT Redux:**
- ❌ Way too much ceremony
- ❌ Overkill for prototypes
- ❌ Steep learning curve

**Why Zustand:**
- ✅ Minimal boilerplate (5 lines for a store)
- ✅ No providers needed
- ✅ Great TypeScript support
- ✅ Perfect for prototype state
- ✅ Easy to understand

**Example:**
```typescript
// stores/useCartStore.ts
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  clear: () => set({ items: [] }),
}));
```

### Mantine UI

**Why NOT Tailwind:**
- ❌ Requires design system thinking upfront
- ❌ Lots of className strings
- ❌ Need to build components from scratch
- ❌ Not opinionated enough for rapid prototyping

**Why NOT Material UI:**
- ❌ Heavy bundle size
- ❌ Dated design aesthetic
- ❌ Complex theme customization

**Why NOT shadcn/ui:**
- ❌ Copy/paste components (not a package)
- ❌ Requires setup for each component
- ❌ Still need to style everything

**Why Mantine:**
- ✅ Complete component library out of the box
- ✅ Modern, clean design (looks good by default)
- ✅ Excellent TypeScript support
- ✅ Built-in hooks for common needs
- ✅ Easy theming if needed
- ✅ Great documentation
- ✅ Active development
- ✅ Perfect for prototyping speed

**Example:**
```tsx
import { Button, Card, TextInput } from '@mantine/core';

<Card shadow="sm" padding="lg">
  <TextInput label="Email" placeholder="you@example.com" />
  <Button mt="md">Submit</Button>
</Card>
```

No styling needed - looks professional immediately.

### TypeScript

**Why:**
- ✅ Catch errors early
- ✅ Better autocomplete (crucial with AI assistants)
- ✅ Self-documenting code
- ✅ Refactoring confidence
- ✅ Industry standard

---

## Project Structure

### Dashboard Homepage

**File:** `src/app/page.tsx`

```tsx
'use client';
import { Container, Title, Text, SimpleGrid, Card, Badge, Group } from '@mantine/core';
import Link from 'next/link';

const prototypes = [
  {
    id: 'checkout-demo',
    name: 'Checkout Flow',
    description: 'Multi-step checkout with payment processing',
    status: 'active',
    path: '/checkout-demo',
  },
  {
    id: 'profile-editor',
    name: 'Profile Editor',
    description: 'User profile editing with form validation',
    status: 'active',
    path: '/profile-editor',
  },
  // More prototypes...
];

export default function Dashboard() {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="md">Prototype Dashboard</Title>
      <Text c="dimmed" mb="xl">
        Select a prototype to explore
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {prototypes.map((prototype) => (
          <Card
            key={prototype.id}
            component={Link}
            href={prototype.path}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ cursor: 'pointer' }}
          >
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{prototype.name}</Text>
              <Badge color={prototype.status === 'active' ? 'green' : 'gray'}>
                {prototype.status}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              {prototype.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
```

### Prototype Toolbar Component

**File:** `src/components/PrototypeToolbar.tsx`

```tsx
'use client';
import { Paper, Group, Select, Button, Text } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';

interface PrototypeToolbarProps {
  currentScenario: string;
  scenarios: Array<{ value: string; label: string }>;
  onScenarioChange: (scenario: string) => void;
  onReset: () => void;
}

export function PrototypeToolbar({
  currentScenario,
  scenarios,
  onScenarioChange,
  onReset,
}: PrototypeToolbarProps) {
  return (
    <Paper 
      shadow="sm" 
      p="md" 
      mb="md" 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        backgroundColor: '#FFF9DB',
        borderLeft: '4px solid #FFD43B'
      }}
    >
      <Group justify="space-between">
        <Group>
          <Text size="sm" fw={500}>Prototype Controls:</Text>
          <Select
            value={currentScenario}
            onChange={(value) => value && onScenarioChange(value)}
            data={scenarios}
            size="sm"
            w={200}
          />
        </Group>
        <Button
          size="sm"
          variant="light"
          leftSection={<IconRefresh size={16} />}
          onClick={onReset}
        >
          Reset
        </Button>
      </Group>
    </Paper>
  );
}
```

### Example Prototype: Checkout

**File:** `src/app/checkout-demo/page.tsx`

```tsx
'use client';
import { useState } from 'react';
import { Container, Title, Stepper, Button, Group } from '@mantine/core';
import { PrototypeToolbar } from '@/components/PrototypeToolbar';
import { useCheckoutStore } from '@/stores/useCheckoutStore';
import { scenarios } from '@/data/scenarios';

export default function CheckoutDemo() {
  const [active, setActive] = useState(0);
  const [scenario, setScenario] = useState('normal');
  
  const { cart, reset } = useCheckoutStore();

  const handleScenarioChange = (newScenario: string) => {
    setScenario(newScenario);
    // Load different data based on scenario
    reset();
    // Apply scenario data...
  };

  return (
    <>
      <PrototypeToolbar
        currentScenario={scenario}
        scenarios={[
          { value: 'normal', label: 'Normal Cart (3 items)' },
          { value: 'empty', label: 'Empty Cart' },
          { value: 'overflow', label: 'Full Cart (20 items)' },
          { value: 'error', label: 'Payment Error' },
        ]}
        onScenarioChange={handleScenarioChange}
        onReset={reset}
      />

      <Container size="md" py="xl">
        <Title order={2} mb="xl">Checkout Flow</Title>

        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Cart" description="Review items">
            {/* Cart content */}
          </Stepper.Step>
          <Stepper.Step label="Shipping" description="Delivery info">
            {/* Shipping form */}
          </Stepper.Step>
          <Stepper.Step label="Payment" description="Complete order">
            {/* Payment form */}
          </Stepper.Step>
        </Stepper>

        <Group justify="space-between" mt="xl">
          <Button variant="default" onClick={() => setActive(active - 1)}>
            Back
          </Button>
          <Button onClick={() => setActive(active + 1)}>
            Next
          </Button>
        </Group>
      </Container>
    </>
  );
}
```

### Zustand Store Example

**File:** `src/stores/useCheckoutStore.ts`

```typescript
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutStore {
  cart: CartItem[];
  shippingInfo: any;
  paymentInfo: any;
  
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setShippingInfo: (info: any) => void;
  setPaymentInfo: (info: any) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  cart: [],
  shippingInfo: null,
  paymentInfo: null,
  
  addItem: (item) => 
    set((state) => ({ cart: [...state.cart, item] })),
  
  removeItem: (id) => 
    set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
  
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  
  setShippingInfo: (info) => set({ shippingInfo: info }),
  setPaymentInfo: (info) => set({ paymentInfo: info }),
  
  reset: () => set({ 
    cart: [], 
    shippingInfo: null, 
    paymentInfo: null 
  }),
}));
```

### Mock Data Scenarios

**File:** `src/data/scenarios.ts`

```typescript
import users from './users.json';
import products from './products.json';

export const scenarios = {
  empty: {
    users: [],
    products: [],
    cart: [],
    message: 'No data available',
  },
  
  normal: {
    users: users.slice(0, 5),
    products: products.slice(0, 10),
    cart: [
      { id: '1', name: 'Product 1', price: 29.99, quantity: 1 },
      { id: '2', name: 'Product 2', price: 49.99, quantity: 2 },
    ],
  },
  
  overflow: {
    users: users,
    products: products,
    cart: Array(20).fill(null).map((_, i) => ({
      id: `item-${i}`,
      name: `Product ${i + 1}`,
      price: Math.random() * 100,
      quantity: Math.floor(Math.random() * 5) + 1,
    })),
  },
  
  error: {
    users: users.slice(0, 5),
    products: products.slice(0, 10),
    cart: [
      { id: '1', name: 'Product 1', price: 29.99, quantity: 1 },
    ],
    errorState: {
      type: 'payment_failed',
      message: 'Payment processing failed. Please try again.',
    },
  },
};

export type ScenarioKey = keyof typeof scenarios;
```

---

## Core Features

### 1. Dashboard Navigation

**Purpose:** Central hub for all prototypes

**Features:**
- Grid layout of prototype cards
- Status badges (active, draft, archived)
- Description and metadata
- Click to navigate to prototype
- Search/filter (future)

**Benefits:**
- Easy to see all prototypes at a glance
- Professional presentation for stakeholders
- No need to remember routes

### 2. Prototype Toolbar

**Purpose:** Demo different data states without code changes

**Features:**
- Scenario selector dropdown
- Reset button (back to default state)
- Sticky position (always visible)
- Visual indicator (yellow background)
- Only visible in prototypes (not dashboard)

**Benefits:**
- Show empty states, error states, overflow
- Quick demos for stakeholders
- No code changes needed
- Clear that this is a prototype

### 3. State Management (Zustand)

**Purpose:** Manage prototype state simply

**Features:**
- Pre-configured stores for common patterns
- TypeScript types included
- Session-based (resets on refresh)
- Examples in each prototype

**Benefits:**
- No boilerplate like Context
- Easy to understand
- Perfect for prototypes
- Scales well

### 4. Mock Data System

**Purpose:** Realistic data for prototypes

**Features:**
- JSON files for data
- Pre-defined scenarios
- Type definitions
- Easy to add new data

**Benefits:**
- Realistic prototypes
- Version controlled
- Easy to edit
- Shareable across prototypes

### 5. Component Library (Mantine)

**Purpose:** Build UIs fast

**Features:**
- Full component library
- Modern design
- Dark mode support
- Accessible by default

**Benefits:**
- Looks professional immediately
- No CSS needed
- Consistent design
- Fast prototyping

---

## CLI Design

### Command Interface

```bash
# Basic usage
npx create-dib-app my-prototypes

# With options
npx create-dib-app my-prototypes --example checkout

# Interactive mode
npx create-dib-app
? Project name: my-prototypes
? Include example prototypes? Yes
? Which examples? (checkout, profile, dashboard)
✓ Created my-prototypes
✓ Installed dependencies
✓ Ready to go!

cd my-prototypes
npm run dev
```

### CLI Options

```
create-dib-app [project-name] [options]

Options:
  --example <name>      Include specific example prototype
  --no-examples         Skip example prototypes
  --package-manager     Specify package manager (npm, pnpm, yarn)
  --typescript          Use TypeScript (default: true)
  --no-git              Skip git initialization
  -h, --help           Display help
  -v, --version        Display version
```

### Post-Creation Output

```
✓ Created my-prototypes

Next steps:
  cd my-prototypes
  npm run dev

Your prototype workspace is ready!

Dashboard:           http://localhost:3000
Example checkout:    http://localhost:3000/checkout-demo
Example profile:     http://localhost:3000/profile-editor

To add a new prototype:
  1. Create folder in src/app/[prototype-name]
  2. Add page.tsx
  3. Update dashboard in src/app/page.tsx

Documentation: README.md
```

---

## Implementation Plan

### Phase 1: Core CLI (Week 1)

**Goal:** Basic scaffolding works

- [ ] Set up CLI project structure
- [ ] Implement create-next-app wrapper
- [ ] Add template files
- [ ] Install dependencies (Mantine, Zustand, etc.)
- [ ] Generate basic project structure
- [ ] Test end-to-end

**Deliverable:** `npx create-dib-app test` creates working project

### Phase 2: Dashboard & Navigation (Week 1-2)

**Goal:** Dashboard homepage works

- [ ] Create dashboard page component
- [ ] Prototype card component
- [ ] Prototype registry/metadata
- [ ] Navigation between dashboard and prototypes
- [ ] Basic styling with Mantine

**Deliverable:** Dashboard shows and links to prototypes

### Phase 3: Prototype Toolbar (Week 2)

**Goal:** State switching works

- [ ] Create PrototypeToolbar component
- [ ] Scenario selector
- [ ] Reset functionality
- [ ] Integration with example prototypes
- [ ] Sticky positioning

**Deliverable:** Can switch between data scenarios in prototypes

### Phase 4: Example Prototypes (Week 2-3)

**Goal:** Two working examples

**Example 1: Checkout Flow**
- [ ] Multi-step flow with Stepper
- [ ] Cart management with Zustand
- [ ] Multiple scenarios (empty, normal, full)
- [ ] Form validation

**Example 2: Profile Editor**
- [ ] Form with validation
- [ ] Avatar upload (mock)
- [ ] Save/cancel states
- [ ] Success/error states

**Deliverable:** Two fully functional example prototypes

### Phase 5: Mock Data & State (Week 3)

**Goal:** Data patterns established

- [ ] Create mock data files (users, products, etc.)
- [ ] Define scenarios system
- [ ] Create Zustand store examples
- [ ] Documentation for patterns

**Deliverable:** Clear patterns for data and state

### Phase 6: Documentation (Week 3-4)

**Goal:** Users can self-serve

- [ ] README with getting started
- [ ] Adding new prototypes guide
- [ ] State management patterns
- [ ] Mock data guide
- [ ] FAQ and troubleshooting

**Deliverable:** Complete documentation

### Phase 7: Polish & Testing (Week 4)

**Goal:** Production ready

- [ ] Test on Mac, Windows, Linux
- [ ] Test with npm, pnpm, yarn
- [ ] Error handling
- [ ] Clean console output
- [ ] Version 1.0.0 release

**Deliverable:** Stable v1.0.0 release

### Phase 8: Publishing (Week 4)

**Goal:** Available to public

- [ ] Publish to npm
- [ ] Create GitHub repo
- [ ] Add example project
- [ ] Write announcement blog post
- [ ] Share on social media

**Deliverable:** Public and usable

---

## Future Enhancements

### Version 1.1

**Add Prototype via CLI:**
```bash
cd my-prototypes
npx dib add profile-settings

? Type of prototype: (form, flow, dashboard, custom)
? Include Zustand store? Yes
✓ Created src/app/profile-settings
✓ Updated dashboard
```

### Version 1.2

**Built-in Design System Themes:**
- Light/dark mode toggle in toolbar
- Pre-defined color schemes
- Easy theme customization

### Version 1.3

**Advanced Scenarios:**
- Time-based scenarios (weekday vs weekend data)
- User role scenarios (admin, user, guest)
- Device scenarios (mobile, tablet, desktop)
- Network scenarios (slow, fast, offline)

### Version 1.4

**Prototype Templates:**
- E-commerce templates
- Dashboard templates
- Form templates
- Admin panel templates

### Version 2.0

**Optional Backend:**
- Mock API server (MSW)
- GraphQL mock endpoint
- WebSocket simulation
- Authentication mock

### Community Ideas

- Figma plugin to generate prototypes
- Claude Code skill for generating prototypes
- Storybook integration
- Screenshot/video capture tool
- Prototype versioning helper

---

## Technical Decisions

### Why Monorepo Over Separate Repos?

**Pros of monorepo:**
- ✅ Single dev server for all prototypes
- ✅ Shared components and utilities
- ✅ Consistent dependencies
- ✅ Easy to navigate between prototypes
- ✅ Single deployment (all prototypes together)

**Cons:**
- ❌ Can become large with many prototypes
- ❌ All prototypes on same Next.js version

**Decision:** Start with monorepo, document how to split later if needed

### Why Dashboard at Root (`/`)?

**Alternatives:**
- All prototypes at root, separate dashboard
- Dashboard at `/dashboard`, prototypes at root
- No dashboard, just list in README

**Decision:** Dashboard at root because:
- First thing you see
- Professional presentation
- Easy to find prototypes
- Natural navigation pattern

### Why Session-Based State?

**Alternatives:**
- LocalStorage (persists between sessions)
- Database (way too complex)
- URL state (limited, ugly URLs)

**Decision:** Session-based because:
- Prototypes should reset easily
- No cleanup needed
- Easy to demo fresh state
- Simpler mental model

### Why TypeScript Required?

**Could offer JavaScript option:**
- More accessible to beginners
- Less setup

**Decision:** TypeScript only because:
- Better with AI assistants (autocomplete)
- Catches errors early
- Self-documenting
- Industry standard
- Not actually harder for prototyping

---

## Success Metrics

### Developer Experience

**Time to first prototype:**
- Target: <30 minutes from `npx create-dib-app` to custom prototype
- Measure: Time user workflow

**Confusion points:**
- Where to add new prototype
- How to add mock data
- State management patterns

### Usage

**Downloads:**
- Month 1: 100 downloads
- Month 3: 500 downloads
- Month 6: 2000 downloads

**GitHub stars:**
- Month 1: 50 stars
- Month 6: 200 stars

**Community:**
- Issues opened (good = engagement)
- Pull requests
- Discussions

### Quality

**Bug rate:**
- Target: <5 critical bugs in first month
- Test: Works on Mac, Windows, Linux

**Documentation clarity:**
- Can users self-serve?
- Clear getting started?
- Good examples?

---

## Marketing & Launch

### Pre-Launch

**Week 1-3: Build in public**
- Tweet progress
- Share screenshots
- Get feedback

**Week 4: Beta testing**
- Invite 5-10 designers/developers
- Gather feedback
- Fix critical issues

### Launch

**Channels:**
- Product Hunt
- Hacker News
- Reddit (r/webdev, r/reactjs)
- Twitter/X
- Dev.to blog post
- LinkedIn

**Content:**
- Demo video (2-3 minutes)
- Blog post: "Why I built this"
- Documentation site
- Example deployments

### Post-Launch

**Week 1-2:**
- Monitor feedback
- Fix critical bugs
- Improve documentation

**Month 1-3:**
- Add requested features
- Create more examples
- Build community

---

## Open Questions

### 1. Mantine vs. Other UI Libraries

**Alternatives to consider:**
- Chakra UI (also component library)
- Ant Design (comprehensive but opinionated)
- Keep Tailwind (more flexible but slower)

**Decision:** Start with Mantine, may add option for Tailwind later

### 2. Monorepo vs. Separate Projects

**Should we also support:**
- `npx create-dib-app --mode separate` creates single prototype?
- Users can choose?

**For now:** Monorepo only, keep it simple

### 3. Example Prototypes

**Which examples to include:**
- Checkout flow (e-commerce)
- Profile editor (forms)
- Dashboard (data visualization)
- Chat interface (real-time)
- Admin table (CRUD)

**For v1.0:** Checkout + Profile (two is enough to show patterns)

### 4. Toolbar Customization

**Should toolbar be:**
- Fixed design (consistent)
- Configurable per prototype
- Completely optional

**For v1.0:** Fixed design, make customizable in v1.1

### 5. CLI vs. Template Repo

**Could also just be:**
- GitHub template repository
- Users click "Use this template"
- No CLI needed

**Decision:** CLI is more convenient, also publish template repo as backup

---

## Conclusion

**create-dib-app** solves the "blank canvas" problem of starting prototypes. Instead of spending hours setting up tools, developers get:

- Complete prototype workspace in one command
- Working examples to learn from
- State management configured
- Mock data patterns established
- Professional dashboard
- Demo-ready toolbar

**Most importantly:** It's opinionated. Decisions are made for you, so you can focus on prototyping.

---

## Next Steps

1. **Validate concept** - Build minimal version for personal use
2. **Test with others** - Get feedback from 3-5 users
3. **Implement Phase 1-4** - Core functionality
4. **Document** - Clear guides and examples
5. **Launch** - npm publish + marketing
6. **Iterate** - Based on real usage

---

**Questions? Ideas?** [Add contact/GitHub discussions]

**License:** MIT

**Version:** 0.1.0 (November 2, 2025)

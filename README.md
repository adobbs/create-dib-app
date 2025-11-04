# create-dib-app

> CLI tool to scaffold opinionated, batteries-included prototype workspaces

## Quick Start

```bash
npx create-dib-app my-prototypes
cd my-prototypes
npm run dev
```

## What You Get

- 🎨 **Mantine UI** - Complete component library
- 🐻 **Zustand** - Simple state management
- ⚡ **Next.js 16** - App Router with TypeScript
- 📊 **Dashboard** - Navigate between prototypes
- 🎭 **Example Prototypes** - Working examples to learn from
- 📚 **Ready to code** - Everything configured

## Features

- Monorepo structure for managing multiple prototypes
- Session-based state (resets on refresh)
- Pre-configured with best practices
- TypeScript by default
- Ready to deploy to Vercel/Netlify

## Example Prototypes

Get started quickly with working examples:

### 🛒 Checkout Flow (`/checkout-demo`)
- Multi-step checkout process with Mantine Stepper
- Shopping cart state management with Zustand
- Product catalog with mock data
- Multiple checkout steps: Cart → Shipping → Payment → Confirmation

### 👤 Profile Editor (`/profile-editor`)
- User profile editing interface
- Form state management
- Mock user data integration
- Clean, modern UI with Mantine components

Each prototype includes:
- **Prototype Toolbar** - Switch between different data states (empty, normal, full)
- **State Management** - Zustand stores with TypeScript
- **Mock Data** - Realistic JSON data files
- **Responsive Design** - Works on all screen sizes

## Development Status

✅ **Version 0.2.0** - Feature-complete prototype workspace

- [x] Core CLI implementation
- [x] Next.js 16 template with Mantine UI
- [x] Dashboard homepage
- [x] Example prototypes (checkout flow, profile editor)
- [x] Prototype toolbar with state switching
- [x] Mock data patterns and Zustand stores
- [x] Lucide icons integration

### What's Next

- [ ] Additional example prototypes (v0.3.0)
- [ ] CLI command to add new prototypes (v0.3.0)
- [ ] Enhanced mock data scenarios (v0.3.0)

## Documentation

See [docs/create-dib-app-architecture.md](./docs/create-dib-app-architecture.md) for full specification.

## Local Development

```bash
# Clone and install
git clone https://github.com/adobbs/create-dib-app.git
cd create-dib-app
npm install

# Build
npm run build

# Test locally
node dist/index.js my-test-project
cd my-test-project
npm run dev
```

## Contributing

This project is in early development. Issues and PRs welcome!

## License

MIT

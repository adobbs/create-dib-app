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
- ⚡ **Next.js 15** - App Router with TypeScript
- 📊 **Dashboard** - Navigate between prototypes
- 📚 **Ready to code** - Everything configured

## Features

- Monorepo structure for managing multiple prototypes
- Session-based state (resets on refresh)
- Pre-configured with best practices
- TypeScript by default
- Ready to deploy to Vercel/Netlify

## Development Status

✅ **Version 0.1.0** - Minimal working version

- [x] Core CLI implementation
- [x] Basic Next.js template with Mantine
- [x] Dashboard homepage
- [ ] Example prototypes (coming in v0.2.0)
- [ ] Prototype toolbar (coming in v0.2.0)
- [ ] Mock data patterns (coming in v0.2.0)

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

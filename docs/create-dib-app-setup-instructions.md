# create-dib-app Setup Instructions

> Complete guide to creating the GitHub repository and local development environment

## Table of Contents

1. [Create GitHub Repository](#1-create-github-repository)
2. [Clone Locally](#2-clone-locally)
3. [Initialize Local Project Structure](#3-initialize-local-project-structure)
4. [Initialize as npm Package](#4-initialize-as-npm-package)
5. [Create Essential Files](#5-create-essential-files)
6. [Create Documentation Folder](#6-create-documentation-folder)
7. [Initial Commit and Push](#7-initial-commit-and-push)
8. [Project Structure Overview](#8-project-structure-overview)
9. [Next Steps](#9-next-steps)
10. [Local Development Testing](#10-local-development-testing)
11. [Quick Reference Commands](#quick-reference-commands)

---

## 1. Create GitHub Repository

**On GitHub.com:**

1. Go to https://github.com/new
2. Fill in repository details:
   - **Repository name:** `create-dib-app`
   - **Description:** "CLI tool to scaffold opinionated, batteries-included prototype workspaces with Next.js, Mantine, and Zustand"
   - **Visibility:** Public
   - **Initialize:** ✅ Add a README file
   - **Add .gitignore:** Node
   - **Choose a license:** MIT License
3. Click "Create repository"

---

## 2. Clone Locally

```bash
# Clone the repository (replace YOUR_USERNAME with your GitHub username)
git clone https://github.com/YOUR_USERNAME/create-dib-app.git
cd create-dib-app
```

---

## 3. Initialize Local Project Structure

```bash
# Create the CLI package structure
mkdir -p src/{templates,utils,cli}
mkdir -p templates/default/src/{app,components,stores,data,lib}
mkdir -p templates/default/public

# Create placeholder files
touch src/index.ts
touch src/cli/create.ts
touch src/cli/prompts.ts
touch src/utils/files.ts
touch src/utils/package-manager.ts
```

---

## 4. Initialize as npm Package

```bash
# Initialize package.json (we'll replace this in the next step)
npm init -y
```

---

## 5. Create Essential Files

### package.json (CLI package)

Create/replace `package.json` in the root with:

```json
{
  "name": "create-dib-app",
  "version": "0.1.0",
  "description": "CLI tool to scaffold opinionated prototype workspaces",
  "type": "module",
  "bin": {
    "create-dib-app": "./dist/index.js"
  },
  "files": [
    "dist",
    "templates"
  ],
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "prepublishOnly": "npm run build",
    "test": "node dist/index.js test-project"
  },
  "keywords": [
    "prototype",
    "scaffold",
    "cli",
    "next.js",
    "mantine",
    "zustand",
    "typescript"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "commander": "^12.0.0",
    "prompts": "^2.4.2",
    "chalk": "^5.3.0",
    "ora": "^8.0.1",
    "fs-extra": "^11.2.0",
    "validate-npm-package-name": "^5.0.0"
  },
  "devDependencies": {
    "@types/fs-extra": "^11.0.4",
    "@types/node": "^20.11.19",
    "@types/prompts": "^2.4.9",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=18.17.0"
  }
}
```

### tsconfig.json

Create `tsconfig.json` in the root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "node",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "templates"]
}
```

### .gitignore (CLI project)

Update/replace `.gitignore` in the root:

```
# Dependencies
node_modules

# Build output
dist

# Logs
*.log*

# Testing
test-project
*.test-project

# IDE
.vscode
.idea
*.swp
.DS_Store

# Temp
*.tmp
```

### README.md

Update the generated `README.md` with:

```markdown
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
- 🎛️ **Prototype Toolbar** - Demo different data states
- 📦 **Mock Data** - Realistic scenarios built-in
- 📚 **Examples** - Checkout flow & profile editor

## Features

- Monorepo structure for managing multiple prototypes
- Session-based state (resets on refresh)
- Pre-configured with best practices
- TypeScript by default
- Ready to deploy to Vercel/Netlify

## Development Status

🚧 **Under Development** - Version 0.1.0

Currently implementing Phase 1: Core CLI scaffolding.

## Documentation

See [docs/create-dib-app-architecture.md](./docs/create-dib-app-architecture.md) for full specification.

## Contributing

This project is in early development. Issues and PRs welcome!

## License

MIT
```

---

## 6. Create Documentation Folder

```bash
# Create docs directory
mkdir docs

# Copy your architecture document
# (Replace the path with where your file is located)
cp /path/to/create-dib-app-architecture.md docs/

# Or manually create and paste the content
```

---

## 7. Initial Commit and Push

```bash
# Install dependencies
npm install

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: project structure and documentation"

# Push to GitHub
git push origin main
```

---

## 8. Project Structure Overview

After setup, your repository should look like this:

```
create-dib-app/
├── README.md                  # Main documentation
├── LICENSE                    # MIT License
├── package.json               # CLI package configuration
├── package-lock.json          # Dependency lock file
├── tsconfig.json              # TypeScript configuration
├── .gitignore                 # Git ignore rules
│
├── docs/
│   └── create-dib-app-architecture.md  # Full specification
│
├── src/                       # CLI source code
│   ├── index.ts              # CLI entry point
│   ├── cli/
│   │   ├── create.ts         # Main creation logic
│   │   └── prompts.ts        # Interactive prompts
│   ├── utils/
│   │   ├── files.ts          # File operations
│   │   └── package-manager.ts # npm/pnpm/yarn detection
│   └── templates/            # (Alternative location for templates)
│
└── templates/                 # Prototype templates
    └── default/              # Default template that gets copied
        ├── package.json      # Template's package.json
        ├── .gitignore        # Template's gitignore
        ├── next.config.js    # Next.js config
        ├── tsconfig.json     # Template's TypeScript config
        ├── README.md         # Generated project README
        ├── postcss.config.js # PostCSS for Mantine
        │
        ├── public/           # Static assets
        │   └── favicon.ico
        │
        └── src/              # Template source code
            ├── app/          # Next.js App Router
            │   ├── layout.tsx
            │   ├── page.tsx  # Dashboard
            │   ├── checkout-demo/
            │   └── profile-editor/
            │
            ├── components/   # Shared components
            │   ├── PrototypeToolbar.tsx
            │   ├── PrototypeLayout.tsx
            │   └── DashboardCard.tsx
            │
            ├── stores/       # Zustand stores
            │   ├── useCheckoutStore.ts
            │   └── README.md
            │
            ├── data/         # Mock data
            │   ├── scenarios.ts
            │   ├── users.json
            │   ├── products.json
            │   └── README.md
            │
            └── lib/          # Utilities
                └── utils.ts
```

---

## 9. Next Steps

### Phase 1: Core CLI Implementation

1. **Implement CLI Entry Point** (`src/index.ts`)
   - Parse command-line arguments
   - Handle help and version flags
   - Route to creation logic

2. **Implement Interactive Prompts** (`src/cli/prompts.ts`)
   - Project name input
   - Package manager selection
   - Example prototype selection

3. **Implement File Operations** (`src/utils/files.ts`)
   - Copy template directory
   - Replace template variables ({{PROJECT_NAME}})
   - Handle file permissions

4. **Implement Package Manager Detection** (`src/utils/package-manager.ts`)
   - Detect available package managers
   - Install dependencies with chosen manager

5. **Build Template Files**
   - Create all files in `templates/default/`
   - Dashboard component
   - Example prototypes
   - Mock data and stores

### Testing Strategy

```bash
# Local development workflow
npm run dev           # TypeScript watch mode
npm link             # Link for global testing
create-dib-app test-project
cd test-project
npm run dev          # Test the generated project
```

### Before Publishing

- [ ] Test on macOS
- [ ] Test on Windows
- [ ] Test on Linux
- [ ] Test with npm
- [ ] Test with pnpm
- [ ] Test with yarn
- [ ] Complete documentation
- [ ] Add examples
- [ ] Set up CI/CD (optional)

---

## 10. Local Development Testing

### Link Package Globally

```bash
# In the create-dib-app directory
npm link
```

This makes the `create-dib-app` command available globally on your machine.

### Test the CLI

```bash
# Create a test project
create-dib-app test-project

# Navigate and test
cd test-project
npm install
npm run dev
```

### Unlink When Done

```bash
# Remove global link
npm unlink -g create-dib-app
```

### Debug Mode

Add `console.log()` statements in your TypeScript files, then:

```bash
# Rebuild and test
npm run build
create-dib-app debug-test
```

---

## Quick Reference Commands

### Setup Commands

```bash
# Initial setup
git clone https://github.com/YOUR_USERNAME/create-dib-app.git
cd create-dib-app
npm install

# Install dependencies
npm install
```

### Development Commands

```bash
# TypeScript watch mode
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Type check
tsc --noEmit
```

### Local Testing Commands

```bash
# Link package globally
npm link

# Test CLI
create-dib-app my-test-project
cd my-test-project
npm install
npm run dev

# Unlink when done
cd ..
npm unlink -g create-dib-app
```

### Git Commands

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Create and switch to new branch
git checkout -b feature/new-feature

# Push new branch
git push origin feature/new-feature
```

### Publishing Commands (when ready)

```bash
# Login to npm
npm login

# Test what will be published
npm pack

# Publish (dry run)
npm publish --dry-run

# Publish for real
npm publish

# Publish with tag (for beta versions)
npm publish --tag beta
```

---

## Troubleshooting

### "Command not found" after npm link

```bash
# Check if it's linked
npm list -g create-dib-app

# Try linking again
npm unlink -g create-dib-app
npm link
```

### TypeScript compilation errors

```bash
# Clean build
rm -rf dist
npm run build
```

### Template files not copying

```bash
# Ensure templates are included in package
# Check that "templates" is in "files" array in package.json
```

### Permission errors on macOS/Linux

```bash
# Make CLI executable
chmod +x dist/index.js
```

---

## Additional Resources

### Documentation

- [Node.js Documentation](https://nodejs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [npm CLI Documentation](https://docs.npmjs.com/cli/)
- [Commander.js (CLI framework)](https://github.com/tj/commander.js)
- [Prompts (Interactive CLI)](https://github.com/terkelg/prompts)

### Example CLI Projects

- [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [create-react-app](https://github.com/facebook/create-react-app)
- [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

### Tools

- [npm-package-json-lint](https://npmpackagejsonlint.org/) - Validate package.json
- [np](https://github.com/sindresorhus/np) - Better npm publish
- [semantic-release](https://github.com/semantic-release/semantic-release) - Automated releases

---

## Contributing

Once the project is more mature, add contribution guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

MIT License - see LICENSE file for details

---

## Support

- **Issues:** https://github.com/YOUR_USERNAME/create-dib-app/issues
- **Discussions:** https://github.com/YOUR_USERNAME/create-dib-app/discussions
- **Documentation:** See `docs/` folder

---

**Last Updated:** November 4, 2025

**Version:** 0.1.0 (Initial Setup)

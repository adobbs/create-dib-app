# {{PROJECT_NAME}}

> Prototype workspace created with [create-dib-app](https://github.com/adobbs/create-dib-app)

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## What's Included

- **Next.js 15** - React framework with App Router
- **Mantine UI** - Complete component library
- **Zustand** - Simple state management
- **TypeScript** - Type safety out of the box

## Project Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout with Mantine
│   │   └── page.tsx      # Dashboard homepage
│   ├── components/       # Shared components
│   ├── stores/          # Zustand stores
│   ├── data/            # Mock data
│   └── lib/             # Utilities
└── public/              # Static assets
```

## Adding a New Prototype

1. Create a new folder in `src/app/`:
   ```bash
   mkdir -p src/app/my-prototype
   ```

2. Add a `page.tsx` file:
   ```tsx
   export default function MyPrototype() {
     return <div>My Prototype</div>;
   }
   ```

3. Update the dashboard in `src/app/page.tsx` to include your new prototype

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine Documentation](https://mantine.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## Deploy

The easiest way to deploy your prototypes is to use [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

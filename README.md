# Multiverse Explorer

A Next.js application to explore, search, and filter characters from the Rick and Morty universe, built with TypeScript, Tailwind CSS, GraphQL, and TanStack Query.

## Tech Stack

- Framework: Next.js (App Router) & React 19
- Language: TypeScript
- Data Fetching & State: GraphQL (graphql-request) + TanStack Query v5
- Styling: Tailwind CSS & classnames
- Testing: Vitest & React Testing Library

## Features

- Character Dashboard: Grid view of characters with pagination support.
- Search & Filter: Search by name with a debounce hook and filter by character status (Alive, Dead, unknown).
- URL-Driven State: All filters and page numbers sync directly with URL search params to support deep linking and browser history navigation.
- Character Details: Dedicated page showing status, species, gender, origin, last known location, and featured episodes.
- Data Prefetching: Server-side data prefetching on the home page via HydrationBoundary.
- Loading & Error States: Skeleton placeholders for cards and layouts, custom 404 page, and global error boundary.

## Project Structure

The project follows a feature-based folder structure:

```text
src/
├── app/                  # Next.js App Router pages and layouts
├── features/
│   └── characters/       # Character domain (components, hooks, services, types)
└── shared/               # Reusable UI components, utilities, and client configs
```

## Choice of Next.js Router: App Router

The App Router (`/app`) was chosen for several architectural advantages:

- React Server Components (RSC): Allows data prefetching on the server to keep heavy logic off the client bundle.
- Built-in Layouts and Error Boundaries: Native collocated support for `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- Hybrid Rendering: Server-side rendering for search and filtering alongside static generation capabilities for detail routes.

## Scope & Trade-offs

To keep the application focused, clean, and avoid over-engineering:

- Manual vs Generated Types: Manual TypeScript domain interfaces were defined for the GraphQL queries instead of setting up complex automated schema code-generation pipelines.
- Lightweight Architecture: Kept dependencies focused on GraphQL client, TanStack Query, and Tailwind CSS without adding heavy UI component libraries.
- Testing Scope: Implemented a focused Vitest suite covering core UI logic, dynamic class styling, and pagination.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory (or copy from `.env.example`):

   ```env
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=[https://rickandmortyapi.com/graphql](https://rickandmortyapi.com/graphql)
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

## Running Tests

To run the unit test suite:

```bash
npm run test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Build for Production

```bash
npm run build
npm run start
```

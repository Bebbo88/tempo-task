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

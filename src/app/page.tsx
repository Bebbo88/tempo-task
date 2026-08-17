import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { fetchCharacters } from "@/features/characters/services/characters.api";
import { getCharactersQueryKey } from "@/features/characters/hooks/useCharacters";
import { CharacterDashboard } from "@/features/characters/components/CharacterDashboard";
import { CharacterStatus } from "@/features/characters/types/character.types";
import { Skeleton } from "@/shared/components/ui/Skeleton";

interface HomePageProps {
  searchParams: Promise<{
    name?: string;
    status?: string;
    page?: string;
  }>;
}

function DashboardFallback() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Multiverse Explorer
        </h1>
        <p className="text-sm text-zinc-400">
          Browse and search Rick and Morty characters across dimensions.
        </p>
      </header>
      <div className="h-10 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  const name = resolvedParams.name?.trim() || undefined;
  const status = (resolvedParams.status as CharacterStatus) || undefined;
  const page = Math.max(1, parseInt(resolvedParams.page || "1", 10));

  const filter = { name, status, page };
  const queryClient = getQueryClient();

  // Prefetch data on the server matching the query key
  await queryClient.prefetchQuery({
    queryKey: getCharactersQueryKey(filter),
    queryFn: () => fetchCharacters(filter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<DashboardFallback />}>
        <CharacterDashboard />
      </Suspense>
    </HydrationBoundary>
  );
}

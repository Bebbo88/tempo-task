import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { fetchCharacters } from "@/features/characters/services/characters.api";
import { getCharactersQueryKey } from "@/features/characters/hooks/useCharacters";
import { CharacterDashboard } from "@/features/characters/components/CharacterDashboard/CharacterDashboard";
import { CharacterStatus } from "@/features/characters/types/character.types";
import { DashboardSkeleton } from "@/features/characters/components/CharacterDashboard/DashboardSkeleton";

interface HomePageProps {
  searchParams: Promise<{
    name?: string;
    status?: string;
    page?: string;
  }>;
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
      <Suspense fallback={<DashboardSkeleton />}>
        <CharacterDashboard />
      </Suspense>
    </HydrationBoundary>
  );
}

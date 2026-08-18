import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchCharacterById,
  fetchCharacters,
} from "@/features/characters/services/characters.api";
import { StatusBadge } from "@/features/characters/components/StatusBadge/StatusBadge";
import { EpisodeList } from "@/features/characters/components/EpisodeList/EpisodeList";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

// ISR configuration: Revalidate static pages every 24 hours in the background
export const revalidate = 86400;

// Enable on-demand static generation for IDs not pre-rendered during build
export const dynamicParams = true;

/**
 * SSG: Pre-generate static paths at build time for the most frequently accessed characters
 */
export async function generateStaticParams() {
  try {
    const data = await fetchCharacters({ page: 1 });
    return (data.results || []).map((character) => ({
      id: character.id.toString(),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = await fetchCharacterById(id);

  if (!character) {
    return {
      title: "Character Not Found | Multiverse Explorer",
      description: "The requested Rick and Morty character could not be found.",
    };
  }

  const description = `Explore details, status, origin, and episodes for ${character.name} (${character.species}).`;

  return {
    title: `${character.name} | Multiverse Explorer`,
    description,
    openGraph: {
      title: character.name,
      description,
      images: [
        {
          url: character.image,
          width: 300,
          height: 300,
          alt: character.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: character.name,
      description,
      images: [character.image],
    },
  };
}

export default async function CharacterDetailsPage({
  params,
}: CharacterPageProps) {
  const { id } = await params;
  const character = await fetchCharacterById(id);

  if (!character) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <Link
            href="/"
            className="text-xs text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-border-subtle rounded px-1 -ml-1"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to Characters</span>
          </Link>
        </div>

        <div className="bg-surface-primary/60 border border-border-subtle rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm">
          <div className="relative aspect-square w-full md:w-80 bg-background shrink-0">
            <Image
              src={character.image}
              alt={character.name}
              fill
              priority
              loading="eager"
              unoptimized
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
            />
            {/* Subtle bottom gradient vignette */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-surface-primary/80 to-transparent pointer-events-none md:hidden" />
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 flex-1">
            <div className="space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary">
                  {character.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <StatusBadge status={character.status} />
                  <span className="text-xs text-secondary">{character.species}</span>
                  {character.gender && (
                    <span className="text-xs text-muted">&bull; {character.gender}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle text-sm">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-muted block">Origin</span>
                  <span className="text-xs text-secondary font-medium block">
                    {character.origin?.name || "Unknown"}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] text-muted block">Last Known Location</span>
                  <span className="text-xs text-secondary font-medium block">
                    {character.location?.name || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            <EpisodeList episodes={character.episode} />
          </div>
        </div>
      </main>
    </div>
  );
}

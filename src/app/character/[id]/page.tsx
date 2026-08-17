import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCharacterById } from "@/features/characters/services/characters.api";
import { StatusBadge } from "@/features/characters/components/StatusBadge";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-zinc-600 rounded px-1 -ml-1"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to Characters</span>
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col md:flex-row">
          <div className="relative aspect-square w-full md:w-80 bg-zinc-950 shrink-0">
            <Image
              src={character.image}
              alt={character.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 flex-1">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                  {character.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <StatusBadge status={character.status} />
                  <span className="text-sm text-zinc-400">{character.species}</span>
                  {character.gender && (
                    <span className="text-sm text-zinc-500">&bull; {character.gender}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-sm">
                <div className="space-y-0.5">
                  <span className="text-zinc-500 text-xs block">Origin</span>
                  <span className="text-zinc-200 font-medium block">
                    {character.origin?.name || "Unknown"}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-zinc-500 text-xs block">Last Known Location</span>
                  <span className="text-zinc-200 font-medium block">
                    {character.location?.name || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            {character.episode && character.episode.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Featured Episodes
                  </h2>
                  <span className="text-xs text-zinc-500">
                    {character.episode.length} {character.episode.length === 1 ? "episode" : "episodes"}
                  </span>
                </div>

                <div
                  tabIndex={0}
                  aria-label="Episodes list"
                  className="max-h-52 overflow-y-auto space-y-2 pr-1.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-800 rounded"
                >
                  {character.episode.map((ep) => (
                    <div
                      key={ep.id}
                      className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 flex items-start justify-between gap-3 hover:border-zinc-700/80 transition-colors"
                    >
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-200 truncate">
                          {ep.name}
                        </p>
                        <p className="text-xs text-zinc-500">{ep.air_date}</p>
                      </div>

                      <span className="font-mono text-xs text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50 shrink-0">
                        {ep.episode}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

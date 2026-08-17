"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
);

import { MutationCache, QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const mutationCache = new MutationCache({
  onError: (error) => {
    console.error("Mutation Error:", error);
    throw error;
  },
  onSuccess: (data) => {
    console.debug("Mutation Success:", data);
  },
});

export const queryClient = new QueryClient({
  mutationCache,
  defaultOptions: {
    mutations: {
      retry: 1,
    },
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 5000, // about staleTime https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data#staletime-and-initialdataupdatedat
    },
  },
});

export const onQuerySuccess = (queryKeys: string[]) => {
  return () => queryClient.invalidateQueries({ queryKey: queryKeys });
}

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});


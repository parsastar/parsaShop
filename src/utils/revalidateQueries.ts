import { queryClient } from "@/app/provider";

export async function revalidateMultipleQueries({
  queries,
}: {
  queries: string[];
}) {
  await queryClient.invalidateQueries({
    predicate: (query) =>
      query.queryKey.some((key) => queries.includes(key as string)), // Use `some` for partial matching
  });
}

export async function revalidateQueries({ queries }: { queries: string[] }) {
  await queryClient.invalidateQueries({
    queryKey: queries,
  });
}

export async function revalidateQuery({ query }: { query: string }) {
  await queryClient.invalidateQueries({
    queryKey: [query],
  });
}

export async function revalidateQueryNotExact({ query }: { query: string }) {
  await queryClient.invalidateQueries({
    queryKey: [query],
    exact: false,
  });
}

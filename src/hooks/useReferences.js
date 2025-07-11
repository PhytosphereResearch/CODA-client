import useSWR from "swr";
import { getReferences } from "../services/interactions";

export default function useReferences() {
  const { data, error, isLoading } = useSWR("/api/references", getReferences, {
    revalidateOnFocus: false,
  });

  const formattedReferences = data?.map((r) => ({
    ...r,
    value: r.id,
    label: r.description||`${r.id}`,
  })).sort((recordA, recordB) => recordA.label.localeCompare(recordB.label));

  return {
    references: data || [],
    formattedReferences: formattedReferences || [],
    isLoading,
    isError: error,
  };
}

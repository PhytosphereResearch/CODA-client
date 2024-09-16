import useSWR from "swr";
import { getReferences } from "../services/interactions";

export default function useReferences() {
  const { data, error, isLoading } = useSWR("/api/references", getReferences, {
    revalidateOnFocus: false,
  });

  const formattedReferences = data?.map((r) => ({
    ...r,
    value: r.id,
    label: r.description,
  }));

  return {
    references: data || [],
    formattedReferences: formattedReferences || [],
    isLoading,
    isError: error,
  };
}

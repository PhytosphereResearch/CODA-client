import useSWR from "swr";
import { getSubSites } from "../services/interactions";

export default function useSubSites() {
  const { data, error, isLoading } = useSWR("/api/oaks", getSubSites, {
    revalidateOnFocus: false,
  });

  return {
    subSites: data || [],
    isLoading,
    isError: error,
  };
}

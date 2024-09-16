import useSWR from "swr";
import format from "../utils/format";
import { getAllAgentSynonyms } from "../services/agents";

export default function useAgents() {
  const { data, error, isLoading } = useSWR(
    "/api/agents",
    getAllAgentSynonyms,
    { revalidateOnFocus: false }
  );

  const formattedAgents = data ? format(data, "agentId") : [];

  return {
    agents: data || [],
    formattedAgents,
    isLoading,
    isError: error,
  };
}

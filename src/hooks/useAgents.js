import useSWR from "swr";
import format from "../utils/format";
import {
  formatAgentFields,
  getAgentFields,
  getAllAgentSynonyms,
} from "../services/agents";

export default function useAgents() {
  const agentFields = useSWR(
    "/api/agent/fields",
    async () => {
      const fields = await getAgentFields();
      return formatAgentFields(fields);
    },
    {
      revalidateOnFocus: false,
    }
  );

  const { data, error, isLoading } = useSWR(
    "/api/agents",
    getAllAgentSynonyms,
    { revalidateOnFocus: false }
  );

  const formattedAgents = data ? format(data, "agentId") : [];

  return {
    agentFields,
    agents: data || [],
    formattedAgents,
    isLoading,
    isError: error,
  };
}

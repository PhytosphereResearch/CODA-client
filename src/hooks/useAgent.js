import useSWR from "swr";
import { getAgent } from "../services/agents";

export default function useAgent(id) {
  const {
    data: agent,
    error,
    isLoading,
  } = useSWR(id ? `/api/agent/${id}` : null, () => getAgent(id), {
    revalidateOnFocus: false,
  });

  return {
    agent,
    isLoading,
    isError: error,
  };
}

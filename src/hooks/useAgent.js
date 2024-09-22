import useSWR from "swr";
import { getAgent } from "../services/agents";

export default function useAgent(id) {
  const {
    data: agent,
    error,
    isLoading,
  } = useSWR(`/api/agent/${id}`, () => getAgent(id), {
    revalidateOnFocus: false,
  });

  return {
    agent,
    isLoading,
    isError: error,
  };
}

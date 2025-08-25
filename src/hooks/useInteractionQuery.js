import useSWR from "swr";
import { getInteractions } from "../services/interactions";

export default function useInteractionQuery({ plantPart, symptomId, oakId }) {
  const {
    data: interactions,
    error,
    isLoading,
  } = useSWR(
    `/api/interactions?plantPart=${plantPart}&symptomId=${symptomId}&oakId=${oakId}`,
    () => getInteractions(plantPart, symptomId, oakId),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    interactions,
    error,
    isLoading,
  };
}

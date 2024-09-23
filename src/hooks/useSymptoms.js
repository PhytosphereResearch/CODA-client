import useSWR from "swr";
import { getAllSymptoms } from "../services/interactions";

export default function useSymptoms() {
  const { data, error, isLoading } = useSWR("/api/symptoms", getAllSymptoms, {
    revalidateOnFocus: false,
  });

  const formattedSymptoms = data?.map((s) => ({
    ...s,
    value: s.id,
    label: s.symptom,
  }));

  return {
    symptoms: data || [],
    formattedSymptoms: formattedSymptoms || [],
    isLoading,
    isError: error,
  };
}

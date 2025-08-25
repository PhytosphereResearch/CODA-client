import useSWR from 'swr';
import { getAllSymptoms } from '../services/interactions';
import sortByLabel from '../utils/sortByLabel';

export default function useSymptoms() {
  const { data, error, isLoading } = useSWR('/api/symptoms', getAllSymptoms, {
    revalidateOnFocus: false,
  });

  const formattedSymptoms = data
    ?.map((s) => ({
      ...s,
      value: s.id,
      label: s.symptom,
    }))
    .sort(sortByLabel);

  return {
    symptoms: data || [],
    formattedSymptoms: formattedSymptoms || [],
    isLoading,
    isError: error,
  };
}

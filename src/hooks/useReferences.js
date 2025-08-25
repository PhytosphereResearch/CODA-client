import useSWR from 'swr';
import { getReferences } from '../services/interactions';
import sortByLabel from '../utils/sortByLabel';

export default function useReferences() {
  const { data, error, isLoading } = useSWR('/api/references', getReferences, {
    revalidateOnFocus: false,
  });

  const formattedReferences = data
    ?.map((r) => ({
      ...r,
      value: r.id,
      label: r.description || `${r.id}`,
    }))
    .sort(sortByLabel);

  return {
    references: data || [],
    formattedReferences: formattedReferences || [],
    isLoading,
    isError: error,
  };
}

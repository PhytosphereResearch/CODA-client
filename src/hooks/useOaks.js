import useSWR from 'swr';
import format from '../utils/format';
import { getAllOaks } from '../services/oaks';

export default function useOaks() {
  const { data, error, isLoading } = useSWR('/api/oaks', getAllOaks, {
    revalidateOnFocus: false,
  });

  const formattedOaks = data ? format(data) : [];

  return {
    oaks: data || [],
    formattedOaks,
    isLoading,
    isError: error,
  };
}

import useSWR from 'swr';
import { getInteraction } from '../services/interactions';

export default function useInteraction(interactionId) {
  const {
    data: interaction,
    error,
    isLoading,
  } = useSWR(
    `/api/interactions/${interactionId}`,
    () => getInteraction(interactionId),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    interaction,
    error,
    isLoading,
  };
}

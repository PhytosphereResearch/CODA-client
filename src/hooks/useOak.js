import useSWR from "swr";
import { getOak } from "../services/oaks";

export default function useOak(id) {
  const { data, error, isLoading } = useSWR(
    `/api/oaks/${id}`,
    () => getOak(id),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    oak: data,
    isLoading,
    isError: error,
  };
}

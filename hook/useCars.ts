import { useEffect } from "react";
import { useFetch } from "@/lib/fetch";
import { Car } from "@/lib/definitions";

export const useCars = (filter?: string, query?: string, limit?: number) => {
  const urlBase = "/(api)/car";

  // Build initial query string (falling back to empty strings if undefined)
  const initialQuery = new URLSearchParams({
    filter: filter || "",
    query: query || "",
    limit: limit != null ? String(limit) : "",
  }).toString();

  const {
    data: carsResponse,
    loading: carsLoading,
    error: carsError,
    refetch,
    setUrl,
  } = useFetch<{ data: Car[] }>(`${urlBase}?${initialQuery}`, {
    method: "GET",
  });

  const cars = carsResponse?.data || [];

  useEffect(() => {
    const qs = new URLSearchParams({
      filter: filter || "",
      query: query || "",
      limit: limit != null ? String(limit) : "",
    }).toString();

    setUrl(`${urlBase}?${qs}`);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, query, limit]);

  return {
    cars,
    loading: carsLoading,
    error: carsError,
  };
};

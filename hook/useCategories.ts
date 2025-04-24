// /hooks/useCategories.ts
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/fetch";
import { Category } from "@/lib/definitions";

interface CategoriesResponse {
  data: {
    categories: Category[];
  };
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    data: res,
    loading,
    error,
    refetch,
  } = useFetch<CategoriesResponse>("/(api)/category", {
    method: "GET",
  });

  // Populate local state whenever data arrives
  useEffect(() => {
    if (res?.data?.categories) {
      setCategories(res.data.categories);
    }
  }, [res]);

  return { categories, loading, error, refetch };
};

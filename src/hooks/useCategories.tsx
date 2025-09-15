import { useQuery} from "@tanstack/react-query";
import type { Category } from "@/types";
import { getAllCategories } from "@/api/apiCategory";

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  });
};

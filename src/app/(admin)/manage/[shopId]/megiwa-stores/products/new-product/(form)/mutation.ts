import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewProduct } from "./action";

export function useNewProductMutation() {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["all-products"];
  const mutation = useMutation({
    mutationFn: createNewProduct,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return mutation;
}

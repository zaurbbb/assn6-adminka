import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteProductByIdFn,
  getProductsByBrandIdFn,
  getProductsBySubCategoryIdFn,
  getProductsFn,
  patchProductByIdFn,
  postProductFn,
} from "../api/fn/products";
import { onQuerySuccess } from "./index";

export const useGetProducts = (api) =>
  useQuery({
    queryKey: [ "useGetProducts"],
    queryFn: () => {
      return getProductsFn(api);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostProduct = (api) =>
  useMutation({
    mutationFn: (data) => postProductFn(api, data),
    onSuccess: onQuerySuccess([ "useGetProducts" ]),
  });

export const usePatchProductById = (api) =>
  useMutation({
    mutationFn: (data) => patchProductByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetProducts" ]),
  });

export const useDeleteProductById = (api) =>
  useMutation({
    mutationFn: (id) => deleteProductByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetProducts" ]),
  });
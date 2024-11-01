import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteCategoryByIdFn,
  getCategoriesFn,
  patchCategoryByIdFn,
  postCategoryFn,
} from "../api/fn/categories";
import { onQuerySuccess } from "./index";

export const useGetCategories = (api) =>
  useQuery({
    queryKey: [ "useGetCategories" ],
    queryFn: () => getCategoriesFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostCategory = (api) =>
  useMutation({
    mutationFn: (data) => postCategoryFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCategories" ]),
  });

export const usePatchCategoryById = (api) =>
  useMutation({
    mutationFn: (data) => patchCategoryByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCategories" ]),
  });

export const useDeleteCategoryById = (api) =>
  useMutation({
    mutationFn: (id) => deleteCategoryByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetCategories" ]),
  });
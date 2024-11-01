import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteSubCategoryByIdFn,
  getSubCategoriesByCategoryIdFn,
  getSubCategoriesFn,
  patchSubCategoryByIdFn,
  postSubCategoryFn,
} from "../api/fn/subCategories";
import { onQuerySuccess } from "./index";

export const useGetSubCategories = (api, id) =>
  useQuery({
    queryKey: [ "useGetSubCategories", id ],
    queryFn: () => {
      if (id) {
        return getSubCategoriesByCategoryIdFn(api, id)
      }

      return getSubCategoriesFn(api)
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostSubCategory = (api) =>
  useMutation({
    mutationFn: (data) => postSubCategoryFn(api, data),
    onSuccess: onQuerySuccess([ "useGetSubCategories" ]),
  });

export const usePatchSubCategoryById = (api) =>
  useMutation({
    mutationFn: (data) => patchSubCategoryByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetSubCategories" ]),
  });

export const useDeleteSubCategoryById = (api) =>
  useMutation({
    mutationFn: (id) => deleteSubCategoryByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetSubCategories" ]),
  });
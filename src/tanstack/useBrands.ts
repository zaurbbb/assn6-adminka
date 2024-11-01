import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteBrandByIdFn,
  getBrandsFn,
  patchBrandByIdFn,
  postBrandFn,
} from "../api/fn/brands";
import { onQuerySuccess } from "./index";

export const useGetBrands = (api) =>
  useQuery({
    queryKey: [ "useGetBrands" ],
    queryFn: () => getBrandsFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostBrand = (api) =>
  useMutation({
    mutationFn: (data) => postBrandFn(api, data),
    onSuccess: onQuerySuccess([ "useGetBrands" ]),
  });

export const usePatchBrandById = (api) =>
  useMutation({
    mutationFn: (data) => patchBrandByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetBrands" ]),
  });

export const useDeleteBrandById = (api) =>
  useMutation({
    mutationFn: (id) => deleteBrandByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetBrands" ]),
  });
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteCityByIdFn,
  getCitiesFn,
  patchCityByIdFn,
  postCityFn,
} from "../api/fn/cities";
import { onQuerySuccess } from "./index";

export const useGetCities = (api) =>
  useQuery({
    queryKey: [ "useGetCities" ],
    queryFn: () => getCitiesFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostCity = (api) =>
  useMutation({
    mutationFn: (data) => postCityFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCities" ]),
  });

export const usePatchCityById = (api) =>
  useMutation({
    mutationFn: (data) => patchCityByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCities" ]),
  });

export const useDeleteCityById = (api) =>
  useMutation({
    mutationFn: (id) => deleteCityByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetCities" ]),
  });
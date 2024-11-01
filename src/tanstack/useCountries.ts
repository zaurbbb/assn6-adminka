import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteCountryByIdFn,
  getCountriesFn,
  patchCountryByIdFn,
  postCountryFn,
} from "../api/fn/countries";
import { onQuerySuccess } from "./index";

export const useGetCountries = (api) =>
  useQuery({
    queryKey: [ "useGetCountries" ],
    queryFn: () => getCountriesFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostCountry = (api) =>
  useMutation({
    mutationFn: (data) => postCountryFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCountries" ]),
  });

export const usePatchCountryById = (api) =>
  useMutation({
    mutationFn: (data) => patchCountryByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCountries" ]),
  });

export const useDeleteCountryById = (api) =>
  useMutation({
    mutationFn: (id) => deleteCountryByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetCountries" ]),
  });
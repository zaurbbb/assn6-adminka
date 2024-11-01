import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deletePersonalAddressByIdFn,
  getPersonalAddressesFn,
  patchPersonalAddressByIdFn,
  postPersonalAddressFn,
} from "../api/fn/personalAddresses";
import { onQuerySuccess } from "./index";

export const useGetPersonalAddresses = (api) =>
  useQuery({
    queryKey: [ "useGetPersonalAddresses" ],
    queryFn: () => getPersonalAddressesFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostPersonalAddress = (api) =>
  useMutation({
    mutationFn: (data) => postPersonalAddressFn(api, data),
    onSuccess: onQuerySuccess([ "useGetPersonalAddresses" ]),
  });

export const usePatchPersonalAddressById = (api) =>
  useMutation({
    mutationFn: (data) => patchPersonalAddressByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetPersonalAddresses" ]),
  });

export const useDeletePersonalAddressById = (api) =>
  useMutation({
    mutationFn: (id) => deletePersonalAddressByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetPersonalAddresses" ]),
  });
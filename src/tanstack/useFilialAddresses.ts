import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteFilialAddressByIdFn,
  getFilialAddressesFn,
  patchFilialAddressByIdFn,
  postFilialAddressFn,
} from "../api/fn/filialAddresses";
import { onQuerySuccess } from "./index";

export const useGetFilialAddresses = (api) =>
  useQuery({
    queryKey: [ "useGetFilialAddresses" ],
    queryFn: () => getFilialAddressesFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostFilialAddress = (api) =>
  useMutation({
    mutationFn: (data) => postFilialAddressFn(api, data),
    onSuccess: onQuerySuccess([ "useGetFilialAddresses" ]),
  });

export const usePatchFilialAddressById = (api) =>
  useMutation({
    mutationFn: (data) => patchFilialAddressByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetFilialAddresses" ]),
  });

export const useDeleteFilialAddressById = (api) =>
  useMutation({
    mutationFn: (id) => deleteFilialAddressByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetFilialAddresses" ]),
  });
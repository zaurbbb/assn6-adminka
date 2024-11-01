import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteServiceAddressByIdFn,
  getServiceAddressesFn,
  patchServiceAddressByIdFn,
  postServiceAddressFn,
} from "../api/fn/serviceAddresses";
import { onQuerySuccess } from "./index";

export const useGetServiceAddresses = (api) =>
  useQuery({
    queryKey: [ "useGetServiceAddresses" ],
    queryFn: () => getServiceAddressesFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostServiceAddress = (api) =>
  useMutation({
    mutationFn: (data) => postServiceAddressFn(api, data),
    onSuccess: onQuerySuccess([ "useGetServiceAddresses" ]),
  });

export const usePatchServiceAddressById = (api) =>
  useMutation({
    mutationFn: (data) => patchServiceAddressByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetServiceAddresses" ]),
  });

export const useDeleteServiceAddressById = (api) =>
  useMutation({
    mutationFn: (id) => deleteServiceAddressByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetServiceAddresses" ]),
  });
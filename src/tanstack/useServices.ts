import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteServiceByIdFn,
  getServicesFn,
  patchServiceByIdFn,
  postServiceFn,
} from "../api/fn/services";
import { onQuerySuccess } from "./index";

export const useGetServices = (api) =>
  useQuery({
    queryKey: [ "useGetServices" ],
    queryFn: () => getServicesFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostService = (api) =>
  useMutation({
    mutationFn: (data) => postServiceFn(api, data),
    onSuccess: onQuerySuccess([ "useGetServices" ]),
  });

export const usePatchServiceById = (api) =>
  useMutation({
    mutationFn: (data) => patchServiceByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetServices" ]),
  });

export const useDeleteServiceById = (api) =>
  useMutation({
    mutationFn: (id) => deleteServiceByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetServices" ]),
  });
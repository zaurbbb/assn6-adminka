import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteSubServiceByIdFn,
  getSubServicesByServiceIdFn,
  getSubServicesFn,
  patchSubServiceByIdFn,
  postSubServiceFn,
} from "../api/fn/subServices";
import { onQuerySuccess } from "./index";

export const useGetSubServices = (api, id) =>
  useQuery({
    queryKey: [ "useGetSubServicesByServiceId", id ],
    queryFn: () => {
      if (id) {
        return getSubServicesByServiceIdFn(api, id);
      }

      return getSubServicesFn(api);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostSubService = (api) =>
  useMutation({
    mutationFn: (data) => postSubServiceFn(api, data),
    onSuccess: onQuerySuccess([ "useGetSubServicesByServiceId" ]),
  });

export const usePatchSubServiceById = (api) =>
  useMutation({
    mutationFn: (data) => patchSubServiceByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetSubServicesByServiceId" ]),
  });

export const useDeleteSubServiceById = (api) =>
  useMutation({
    mutationFn: (id) => deleteSubServiceByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetSubServicesByServiceId" ]),
    onError: onQuerySuccess([ "useGetSubServicesByServiceId" ]),
  });
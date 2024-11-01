import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteServiceItemByIdFn,
  getServiceItemBySubServiceIdFn,
  getServiceItemsFn,
  patchServiceItemByIdFn,
  postServiceItemFn,
} from "../api/fn/serviceItems";
import { onQuerySuccess } from "./index";

export const useGetServiceItems = (api, id) =>
  useQuery({
    queryKey: [ "useGetServiceItems", id ],
    queryFn: () => {
      if (id) {
        return getServiceItemBySubServiceIdFn(api, id);
      }

      return getServiceItemsFn(api);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostServiceItem = (api) =>
  useMutation({
    mutationFn: (data) => postServiceItemFn(api, data),
    onSuccess: onQuerySuccess([ "useGetServiceItems" ]),
  });

export const usePatchServiceItemById = (api) =>
  useMutation({
    mutationFn: (data) => patchServiceItemByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetServiceItems" ]),
  });

export const useDeleteServiceItemById = (api) =>
  useMutation({
    mutationFn: (id) => deleteServiceItemByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetServiceItems" ]),
  });
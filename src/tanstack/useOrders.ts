import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteOrderByIdFn,
  getOrdersFn,
  patchOrderByIdFn,
  postOrderFn,
} from "../api/fn/orders";
import { onQuerySuccess } from "./index";

export const useGetOrders = (api) =>
  useQuery({
    queryKey: [ "useGetOrders" ],
    queryFn: () => getOrdersFn(api, ""),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostOrder = (api) =>
  useMutation({
    mutationFn: (data) => postOrderFn(api, data),
    onSuccess: onQuerySuccess([ "useGetOrders" ]),
  });

export const usePatchOrderById = (api) =>
  useMutation({
    mutationFn: (data) => patchOrderByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetOrders" ]),
  });

export const useDeleteOrderById = (api) =>
  useMutation({
    mutationFn: (id) => deleteOrderByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetOrders" ]),
  });
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteLogByIdFn,
  getLogsFn,
  patchLogByIdFn,
  postLogFn,
} from "../api/fn/logs";
import { onQuerySuccess } from "./index";

export const useGetLogs = (api) =>
  useQuery({
    queryKey: [ "useGetLogs" ],
    queryFn: () => getLogsFn(api, ""),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostLog = (api) =>
  useMutation({
    mutationFn: (data) => postLogFn(api, data),
    onSuccess: onQuerySuccess([ "useGetLogs" ]),
  });

export const usePatchLogById = (api) =>
  useMutation({
    mutationFn: (data) => patchLogByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetLogs" ]),
  });

export const useDeleteLogById = (api) =>
  useMutation({
    mutationFn: (id) => deleteLogByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetLogs" ]),
  });
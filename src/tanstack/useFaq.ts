import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteFaqByIdFn,
  getFaqFn,
  patchFaqByIdFn,
  postFaqFn,
} from "../api/fn/faq";
import { onQuerySuccess } from "./index";

export const useGetFaq = (api) =>
  useQuery({
    queryKey: [ "useGetFaq" ],
    queryFn: () => getFaqFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostFaq = (api) =>
  useMutation({
    mutationFn: (data) => postFaqFn(api, data),
    onSuccess: onQuerySuccess([ "useGetFaq" ]),
  });

export const usePatchFaqById = (api) =>
  useMutation({
    mutationFn: (data) => patchFaqByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetFaq" ]),
  });

export const useDeleteFaqById = (api) =>
  useMutation({
    mutationFn: (id) => deleteFaqByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetFaq" ]),
  });

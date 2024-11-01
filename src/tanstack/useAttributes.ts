import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteAttributeByIdFn,
  deleteAttributesByProductIdFn,
  getAttributesByCharacteristicIdFn,
  getAttributesFn,
  patchAttributeByIdFn,
  postAttributeFn,
} from "../api/fn/attributes";
import { onQuerySuccess } from "./index";

export const useGetAttributes = (api, characteristicId) =>
  useQuery({
    queryKey: [ "useGetAttributes", characteristicId ],
    queryFn: () => {
      if (characteristicId) {
        return getAttributesByCharacteristicIdFn(api, characteristicId);
      }

      return getAttributesFn(api);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostAttribute = (api) =>
  useMutation({
    mutationFn: (data) => postAttributeFn(api, data),
    onSuccess: onQuerySuccess([ "useGetAttributes" ]),
  });

export const usePatchAttributeById = (api) =>
  useMutation({
    mutationFn: (data) => patchAttributeByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetAttributes" ]),
  });

export const useDeleteAttributeById = (api) =>
  useMutation({
    mutationFn: (id) => deleteAttributeByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetAttributes" ]),
  });

export const useDeleteAttributesByProductIdFn = (api) =>
  useMutation({
    mutationFn: (data) => deleteAttributesByProductIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetAttributes" ]),
  });

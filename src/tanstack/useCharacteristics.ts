import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteCharacteristicByIdFn,
  getCharacteristicsByCategoryIdFn,
  getCharacteristicsBySubCategoryIdFn,
  getCharacteristicsFn,
  patchCharacteristicByIdFn,
  postCharacteristicFn,
} from "../api/fn/characteristics";
import { onQuerySuccess } from "./index";

export const useGetCharacteristics = (api, subCategoryid) =>
  useQuery({
    queryKey: [ "useGetCharacteristics", subCategoryid ],
    queryFn: () => {
      if (subCategoryid) {
        return getCharacteristicsBySubCategoryIdFn(api, subCategoryid)
      }

      return getCharacteristicsFn(api)
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostCharacteristic = (api) =>
  useMutation({
    mutationFn: (data) => postCharacteristicFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCharacteristics" ]),
  });

export const usePatchCharacteristicById = (api) =>
  useMutation({
    mutationFn: (data) => patchCharacteristicByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetCharacteristics" ]),
  });

export const useDeleteCharacteristicById = (api) =>
  useMutation({
    mutationFn: (id) => deleteCharacteristicByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetCharacteristics" ]),
  });
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteProfileSectionByIdFn,
  getProfileSectionsFn,
  patchProfileSectionByIdFn,
  postProfileSectionFn,
} from "../api/fn/profileSections";
import { onQuerySuccess } from "./index";

export const useGetProfileSections = (api) =>
  useQuery({
    queryKey: [ "useGetProfileSections" ],
    queryFn: () => getProfileSectionsFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostProfileSection = (api) =>
  useMutation({
    mutationFn: (data) => postProfileSectionFn(api, data),
    onSuccess: onQuerySuccess([ "useGetProfileSections" ]),
  });

export const usePatchProfileSectionById = (api) =>
  useMutation({
    mutationFn: (data) => patchProfileSectionByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetProfileSections" ]),
  });

export const useDeleteProfileSectionById = (api) =>
  useMutation({
    mutationFn: (id) => deleteProfileSectionByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetProfileSections" ]),
  });

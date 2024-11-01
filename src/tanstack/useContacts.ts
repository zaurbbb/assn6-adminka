import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteContactByIdFn,
  getContactsFn,
  patchContactByIdFn,
  postContactFn,
} from "../api/fn/contacts";
import { onQuerySuccess } from "./index";

export const useGetContacts = (api) =>
  useQuery({
    queryKey: [ "useGetContacts" ],
    queryFn: () => getContactsFn(api),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostContact = (api) =>
  useMutation({
    mutationFn: (data) => postContactFn(api, data),
    onSuccess: onQuerySuccess([ "useGetContacts" ]),
  });

export const usePatchContactById = (api) =>
  useMutation({
    mutationFn: (data) => patchContactByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetContacts" ]),
  });

export const useDeleteContactById = (api) =>
  useMutation({
    mutationFn: (id) => deleteContactByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetContacts" ]),
  });
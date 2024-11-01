import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteStaffByIdFn,
  getStaffByServiceAddressIdFn,
  getStaffByServiceIdFn,
  getStaffFn,
  getStaffTimeSlotsByDateFn,
  patchStaffByIdFn,
  postStaffFn,
} from "../api/fn/staff";
import { onQuerySuccess } from "./index";

export const useGetStaff = (api, id, type) =>
  useQuery({
    queryKey: [ "useGetStaff", "useGetStaffTimeSlotsByDate", id, type ],
    queryFn: () => {
      if (type === "service") {
        return getStaffByServiceIdFn(api, id);
      }
      if (type === "serviceAddress") {
        return getStaffByServiceAddressIdFn(api, id);
      }

      return getStaffFn(api);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useGetStaffTimeSlotsByDate = (api, id, date) =>
  useQuery({
    queryKey: [ "useGetStaffTimeSlotsByDate", id, date ],
    queryFn: () => getStaffTimeSlotsByDateFn(api, id, date),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostStaff = (api) =>
  useMutation({
    mutationFn: (data) => postStaffFn(api, data),
    onSuccess: onQuerySuccess([ "useGetStaff" ]),
  });

export const usePatchStaffById = (api) =>
  useMutation({
    mutationFn: (data) => patchStaffByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetStaff" ]),
  });

export const useDeleteStaffById = (api) =>
  useMutation({
    mutationFn: (id) => deleteStaffByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetStaff" ]),
  });
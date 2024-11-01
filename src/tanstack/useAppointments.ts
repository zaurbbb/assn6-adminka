import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteAppointmentByIdFn,
  getAppointmentsByStaffIdFn,
  getAppointmentsFn,
  patchAppointmentByIdFn,
  postAppointmentFn,
} from "../api/fn/appointments";
import { onQuerySuccess } from "./index";

export const useGetAppointments = (api, staffId) =>
  useQuery({
    queryKey: [ "useGetAppointments", staffId ],
    queryFn: () => {
      if (staffId) {
        return getAppointmentsByStaffIdFn(api, staffId);
      }

      return getAppointmentsFn(api);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useGetAppointmentsByStaffId = (api, staffId) =>
  useQuery({
    queryKey: [ "useGetAppointments", staffId ],
    queryFn: () => getAppointmentsByStaffIdFn(api, staffId),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const usePostAppointment = (api) =>
  useMutation({
    mutationFn: (data) => postAppointmentFn(api, data),
    onSuccess: onQuerySuccess([ "useGetAppointments" ]),
  });

export const usePatchAppointmentById = (api) =>
  useMutation({
    mutationFn: (data) => patchAppointmentByIdFn(api, data),
    onSuccess: onQuerySuccess([ "useGetAppointments" ]),
  });

export const useDeleteAppointmentById = (api) =>
  useMutation({
    mutationFn: (id) => deleteAppointmentByIdFn(api, id),
    onSuccess: onQuerySuccess([ "useGetAppointments" ]),
  });
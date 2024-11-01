
import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getAppointmentsFn = async (api) =>
  await API.get(`/admin/appointments`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getAppointmentsByStaffIdFn = async (api, id) =>
  await API.get(`/staff/${id}/appointments`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postAppointmentFn = async (api, data) =>
  await API.post("/admin/appointments", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchAppointmentByIdFn = async (api, data) =>
  await API.patch(`/admin/appointments/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteAppointmentByIdFn = async (api, id) =>
  await API.delete(`/admin/appointments/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
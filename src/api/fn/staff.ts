import {
  API,
  errorAnswer,
  multiPartFormDataConfig,
  responseAnswer,
} from "../index";

export const getStaffFn = async (api) =>
  await API.get("/staff")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getStaffByServiceIdFn = async (api, id) =>
  await API.get(`/services/${id}/staff`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getStaffByServiceAddressIdFn = async (api, id) =>
  await API.get(`/service-addresses/${id}/staff`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getStaffTimeSlotsByDateFn = async (api, id, date) =>
  await API.get(`/staff/${id}/time-slots`, { params: { date } })
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postStaffFn = async (api, data) =>
  await API.post("/admin/staff", data, multiPartFormDataConfig)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchStaffByIdFn = async (api, data) =>
  await API.patch(`/admin/staff/${data.id}`, data.values, multiPartFormDataConfig)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteStaffByIdFn = async (api, id) =>
  await API.delete(`/admin/staff/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
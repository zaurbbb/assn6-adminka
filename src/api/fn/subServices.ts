import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getSubServicesFn = async (api) =>
  await API.get("/subservices")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getSubServicesByServiceIdFn = async (api, id) =>
  await API.get(`/services/${id}/subservices`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postSubServiceFn = async (api, data) =>
  await API.post("/admin/subservices", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchSubServiceByIdFn = async (api, data) =>
  await API.patch(`/admin/subservices/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteSubServiceByIdFn = async (api, id) =>
  await API.delete(`/admin/subservices/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
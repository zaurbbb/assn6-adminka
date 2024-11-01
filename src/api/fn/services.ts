import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getServicesFn = async (api) =>
  await API.get("/services")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postServiceFn = async (api, data) =>
  await API.post("/admin/services", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchServiceByIdFn = async (api, data) =>
  await API.patch(`/admin/services/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteServiceByIdFn = async (api, id) =>
  await API.delete(`/admin/services/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
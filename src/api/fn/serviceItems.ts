import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getServiceItemsFn = async (api) =>
  await API.get("/service_items")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getServiceItemBySubServiceIdFn = async (api, id) =>
  await API.get(`/subservices/${id}/service_items`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postServiceItemFn = async (api, data) =>
  await API.post("/admin/service_items", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchServiceItemByIdFn = async (api, data) =>
  await API.patch(`/admin/service_items/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteServiceItemByIdFn = async (api, id) =>
  await API.delete(`/admin/service_items/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
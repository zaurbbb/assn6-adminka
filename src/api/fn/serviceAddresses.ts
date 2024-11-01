import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getServiceAddressesFn = async (api) =>
  await API.get("/service-address")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postServiceAddressFn = async (api, data) =>
  await API.post("/admin/service-address", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchServiceAddressByIdFn = async (api, data) =>
  await API.patch(`/admin/service-address/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteServiceAddressByIdFn = async (api, id) =>
  await API.delete(`/admin/service-address/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
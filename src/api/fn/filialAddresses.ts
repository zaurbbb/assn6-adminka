import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getFilialAddressesFn = async (api) =>
  await API.get("/filial_addresses")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postFilialAddressFn = async (api, data) =>
  await API.post("/admin/filial_addresses", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchFilialAddressByIdFn = async (api, data) =>
  await API.put(`/admin/filial_addresses/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteFilialAddressByIdFn = async (api, id) =>
  await API.delete(`/admin/filial_addresses/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
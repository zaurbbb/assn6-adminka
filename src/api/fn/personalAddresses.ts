import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getPersonalAddressesFn = async (api) =>
  await API.get("/personal_addresses")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postPersonalAddressFn = async (api, data) =>
  await API.post("/admin/personal_addresses", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchPersonalAddressByIdFn = async (api, data) =>
  await API.put(`/admin/personal_addresses/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deletePersonalAddressByIdFn = async (api, id) =>
  await API.delete(`/admin/personal_addresses/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
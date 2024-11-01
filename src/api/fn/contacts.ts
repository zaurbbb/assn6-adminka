import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getContactsFn = async (api) =>
  await API.get("/contacts")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postContactFn = async (api, data) =>
  await API.post("/admin/contacts", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchContactByIdFn = async (api, data) =>
  await API.patch(`/admin/contacts/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteContactByIdFn = async (api, id) =>
  await API.delete(`/admin/contacts/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
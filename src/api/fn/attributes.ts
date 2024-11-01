import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getAttributesFn = async (api) =>
  await API.get("/attributes")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getAttributesByCharacteristicIdFn = async (api, characteristicId) =>
  await API.get(`/characteristics/${characteristicId}/attributes`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postAttributeFn = async (api, data) =>
  await API.post("/admin/attributes", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchAttributeByIdFn = async (api, data) =>
  await API.patch(`/admin/attributes/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteAttributeByIdFn = async (api, id) =>
  await API.delete(`/admin/attributes/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteAttributesByProductIdFn = async (api, data) =>
  await API.post(`/admin/products/${data.productId}/attributes`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
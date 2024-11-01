import {
  API,
  errorAnswer,
  multiPartFormDataConfig,
  responseAnswer,
} from "../index";

export const getCharacteristicsFn = async (api) =>
  await API.get("/characteristics")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getCharacteristicsBySubCategoryIdFn = async (api, subCategoryid) =>
  await API.get(`/subcategories/${subCategoryid}/characteristics`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postCharacteristicFn = async (api, data) =>
  await API.post("/admin/characteristics", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchCharacteristicByIdFn = async (api, data) =>
  await API.patch(`/admin/characteristics/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteCharacteristicByIdFn = async (api, id) =>
  await API.delete(`/admin/characteristics/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
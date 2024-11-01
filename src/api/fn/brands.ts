import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getBrandsFn = async (api) =>
  await API.get("/brands")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postBrandFn = async (api, data) =>
  await API.post("/admin/brands", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchBrandByIdFn = async (api, data) =>
  await API.patch(`/admin/brands/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteBrandByIdFn = async (api, id) =>
  await API.delete(`/admin/brands/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
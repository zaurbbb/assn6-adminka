import {
  API,
  errorAnswer,
  multiPartFormDataConfig,
  responseAnswer,
} from "../index";

export const getProductsFn = async (api) =>
  await API.get("/admin/products/")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getProductsBySubCategoryIdFn = async (api, queries, id) =>
  await API.get(`/subcategories/${id}/products`, { params: queries })
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getProductsByBrandIdFn = async (api, queries, id) =>
  await API.get(`/brands/${id}/products`, { params: queries })
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postProductFn = async (api, data) =>
  await API.post("/admin/products/", data, multiPartFormDataConfig)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchProductByIdFn = async (api, data) =>
  await API.patch(`/admin/products/${data.id}`, data.values, multiPartFormDataConfig)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteProductByIdFn = async (api, id) =>
  await API.delete(`/admin/products/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
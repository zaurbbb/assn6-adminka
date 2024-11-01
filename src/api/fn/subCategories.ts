import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";


export const getSubCategoriesFn = async (api) =>
  await API.get(`/subcategories`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const getSubCategoriesByCategoryIdFn = async (api, id) =>
  await API.get(`/categories/${id}/subcategories`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postSubCategoryFn = async (api, data) =>
  await API.post("/admin/subcategories", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchSubCategoryByIdFn = async (api, data) =>
  await API.patch(`/admin/subcategories/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteSubCategoryByIdFn = async (api, id) =>
  await API.delete(`/admin/subcategories/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
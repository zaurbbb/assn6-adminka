import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getCategoriesFn = async (api) =>
  await API.get("/admin/categories/")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postCategoryFn = async (api, data) =>
  await API.post("/admin/categories/", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchCategoryByIdFn = async (api, data) =>
  await API.patch(`/admin/categories/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteCategoryByIdFn = async (api, id) =>
  await API.delete(`/admin/categories/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
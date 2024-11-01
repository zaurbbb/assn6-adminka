import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getCitiesFn = async (api) =>
  await API.get("/cities")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postCityFn = async (api, data) =>
  await API.post("/admin/cities", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchCityByIdFn = async (api, data) =>
  await API.patch(`/admin/cities/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteCityByIdFn = async (api, id) =>
  await API.delete(`/admin/cities/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
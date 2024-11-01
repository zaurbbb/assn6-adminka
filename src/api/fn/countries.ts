import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getCountriesFn = async (api) =>
  await API.get("/countries")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postCountryFn = async (api, data) =>
  await API.post("/admin/countries", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchCountryByIdFn = async (api, data) =>
  await API.patch(`/admin/countries/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteCountryByIdFn = async (api, id) =>
  await API.delete(`/admin/countries/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
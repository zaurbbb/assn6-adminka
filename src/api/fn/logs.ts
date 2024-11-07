
import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getLogsFn = async (api, status) =>
  // await API.get(`/admin/logs${status ? `?status=${status}` : ""}`)
  await API.get(`/admin/logs/`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postLogFn = async (api, data) =>
  await API.post("/admin/logs/", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchLogByIdFn = async (api, data) =>
  await API.patch(`/admin/logs/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteLogByIdFn = async (api, id) =>
  await API.delete(`/admin/logs/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
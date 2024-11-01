
import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getOrdersFn = async (api, status) =>
  // await API.get(`/admin/orders${status ? `?status=${status}` : ""}`)
  await API.get(`/admin/orders/`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postOrderFn = async (api, data) =>
  await API.post("/admin/orders/", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchOrderByIdFn = async (api, data) =>
  await API.patch(`/admin/orders/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteOrderByIdFn = async (api, id) =>
  await API.delete(`/admin/orders/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
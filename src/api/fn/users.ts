import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getUsersFn = async (api) =>
  API.get("/admin/users")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchUserByIdFn = async (api, data) =>
  API.patch(`/admin/users/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteUserByIdFn = async (api, id) =>
  API.delete(`/admin/users/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

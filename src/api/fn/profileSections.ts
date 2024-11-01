import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getProfileSectionsFn = async (api) =>
  await API.get("/profile-sections")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postProfileSectionFn = async (api, data) =>
  await API.post("/admin/profile-sections", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchProfileSectionByIdFn = async (api, data) =>
  await API.patch(`/admin/profile-sections/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteProfileSectionByIdFn = async (api, id) =>
  await API.delete(`/admin/profile-sections/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));



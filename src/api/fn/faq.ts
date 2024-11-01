import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const getFaqFn = async (api) =>
  await API.get("/faq")
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const postFaqFn = async (api, data) =>
  await API.post("/admin/faq", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const patchFaqByIdFn = async (api, data) =>
  await API.put(`/admin/faq/${data.id}`, data.values)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteFaqByIdFn = async (api, id) =>
  await API.delete(`/admin/faq/${id}`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));



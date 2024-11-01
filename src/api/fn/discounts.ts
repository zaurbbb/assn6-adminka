import {
  API,
  errorAnswer,
  responseAnswer,
} from "../index";

export const postDiscountFn = async (api, data) =>
  await API.post("/discounts", data)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));

export const deleteDiscountByProductId = async (api, id) => {
  await API.delete(`/products/${id}/discounts`)
    .then((response) => responseAnswer(response, api))
    .catch((error) => errorAnswer(error));
}

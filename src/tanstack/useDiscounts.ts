import { useMutation } from "@tanstack/react-query";
import {
  postDiscountFn,
  deleteDiscountByProductId,
} from "../api/fn/discounts";
import { onQuerySuccess } from "./index";

export const usePostDiscount = (api) =>
  useMutation({
    mutationFn: (data) => postDiscountFn(api, data),
    onSuccess: onQuerySuccess([ "useGetProducts" ]),
  });

export const useDeleteDiscountByProductId = (api) =>
  useMutation({
    mutationFn: (id) => deleteDiscountByProductId(api, id),
    onSuccess: onQuerySuccess([ "useGetProducts" ]),
  });
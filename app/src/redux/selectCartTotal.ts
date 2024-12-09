import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => {
    const subTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shippingFee = 10.0;
    const total = subTotal + shippingFee;
    return { subTotal, shippingFee, total };
  }
);

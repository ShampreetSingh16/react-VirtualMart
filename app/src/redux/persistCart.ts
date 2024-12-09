import { Middleware } from "@reduxjs/toolkit";

const persistCart: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    localStorage.setItem('Cart', JSON.stringify(state.cart));

    return result;
};

export default persistCart;
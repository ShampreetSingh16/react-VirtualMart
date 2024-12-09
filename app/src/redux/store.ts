import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlices";
import persistCart from "./persistCart";

export const store = configureStore({
    reducer:{
    cart : cartReducer,
    auth: authReducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistCart)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
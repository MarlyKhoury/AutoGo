import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import carReducer from "./slices/carSlice";

export const store = configureStore({
    reducer: {
        nav: navReducer,
        car:carReducer
    }
});
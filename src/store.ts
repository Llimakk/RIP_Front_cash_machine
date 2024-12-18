import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import cookieReducer from "./slices/cookieSlice";
import cartReducer from "./slices/cartSlice";
import userReducer  from "./slices/userSlice";
import loginReducer from "./slices/loginSlice";
import registrationReducer from "./slices/registrationSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        cart: cartReducer,
        login: loginReducer,
        registration: registrationReducer,
        user: userReducer,
        cookie: cookieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
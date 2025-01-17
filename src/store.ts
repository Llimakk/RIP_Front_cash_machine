import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import cookieReducer from "./slices/cookieSlice";
import userReducer  from "./slices/userSlice";
import operatReducer  from "./slices/operatSlice";
import myOperatReducer from "./slices/formdSlice"

export const store = configureStore({
    reducer: {
        myOperat: myOperatReducer,
        search: searchReducer,
        user: userReducer,
        cookie: cookieReducer,
        operat: operatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
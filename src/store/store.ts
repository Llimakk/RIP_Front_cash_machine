import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import operationsReducer from "./slices/operationsSlice.ts"
import billsReducer from "./slices/billsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        operations: operationsReducer,
        bills: billsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
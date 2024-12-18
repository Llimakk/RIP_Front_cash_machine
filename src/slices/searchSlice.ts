import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    billName: string;
}

const initialState: SearchState = {
    billName: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setBillName(state, action: PayloadAction<string>) {
            state.billName = action.payload;
        },
    },
});

export const { setBillName } = searchSlice.actions;
export default searchSlice.reducer;
export type { SearchState }; 
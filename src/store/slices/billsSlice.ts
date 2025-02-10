import {createSlice} from "@reduxjs/toolkit";

type T_BillsSlice = {
    bill_name: string
}

const initialState:T_BillsSlice = {
    bill_name: "",
}


const billsSlice = createSlice({
    name: 'bills',
    initialState: initialState,
    reducers: {
        updateBillName: (state, action) => {
            state.bill_name = action.payload
        }
    }
})

export const { updateBillName} = billsSlice.actions;

export default billsSlice.reducer
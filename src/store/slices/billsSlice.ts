import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Bill, T_BillAddData, T_BillsListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios, {AxiosResponse} from "axios";
import {saveOperation} from "store/slices/operationsSlice.ts";
import {Bill} from "src/api/Api.ts";

type T_BillsSlice = {
    bill_name: string
    bill: null | T_Bill
    bills: T_Bill[]
    deleted_bills: T_Bill[]
}

const initialState:T_BillsSlice = {
    bill_name: "",
    bill: null,
    bills: [],
    deleted_bills: []
}

export const fetchBill = createAsyncThunk<T_Bill, string, AsyncThunkConfig>(
    "fetch_bill",
    async function(id) {
        const response = await api.bills.billsRead(id) as AxiosResponse<T_Bill>
        return response.data
    }
)

export const fetchBills = createAsyncThunk<T_Bill[], object, AsyncThunkConfig>(
    "fetch_bills",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.bills.billsList({
            bill_name: state.bills.bill_name
        }) as AxiosResponse<T_BillsListResponse>

        thunkAPI.dispatch(saveOperation({
            draft_operation_id: response.data.draft_operation_id,
            bills_count: response.data.bills_count
        }))

        return {
            bills: response.data.bills, // Активные купюры
            deleted_bills: response.data.deleted_bills // Удаленные купюры
        };
    }
)

export const addBillToOperation = createAsyncThunk<void, string, AsyncThunkConfig>(
    "bills/add_bill_to_operation",
    async function(bill_id) {
        await api.bills.billsAddToOperationCreate(bill_id)
    }
)

export const deleteBill = createAsyncThunk<T_Bill[], string, AsyncThunkConfig>(
    "delete_bill",
    async function(bill_id) {
        const response = await api.bills.billsDeleteDelete(bill_id) as AxiosResponse<T_Bill[]>
        return response.data
    }
)

export const updateBill = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_bill",
    async function({bill_id, data}) {
        await api.bills.billsUpdateUpdate(bill_id as string, data as Bill)
    }
)

export const updateBillImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_bill_image",
    async function({bill_id, data}) {
        await api.bills.billsUpdateImageCreate(bill_id as string, data as {image?: File})
    }
)

export const createBill = createAsyncThunk<void, T_BillAddData, AsyncThunkConfig>(
    "update_bill",
    async function(data) {
        await api.bills.billsCreateCreate(data)
    }
)

export const restoreBill = createAsyncThunk("bills/restoreBill", async (bill_id, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/bills/${bill_id}/restore/`);
        return response.data.bill;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const billsSlice = createSlice({
    name: 'bills',
    initialState: initialState,
    reducers: {
        updateBillName: (state, action) => {
            state.bill_name = action.payload
        },
        removeSelectedBill: (state) => {
            state.bill = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBills.fulfilled, (state:T_BillsSlice, action: PayloadAction<{ bills: T_Bill[], deleted_bills: T_Bill[] }>) => {
            state.bills = action.payload.bills;
            state.deleted_bills = action.payload.deleted_bills;
        });
        builder.addCase(fetchBill.fulfilled, (state:T_BillsSlice, action: PayloadAction<T_Bill>) => {
            state.bill = action.payload
        });
        builder.addCase(deleteBill.fulfilled, (state:T_BillsSlice, action: PayloadAction<T_Bill[]>) => {
            state.bills = action.payload
        });
        builder.addCase(restoreBill.fulfilled, (state, action) => {
            // Удаляем купюру из удаленных и добавляем в активные
            state.deleted_bills = state.deleted_bills.filter((bill) => bill.id !== action.payload.id);
            state.bills.push(action.payload);
        });
    }
})

export const { updateBillName, removeSelectedBill} = billsSlice.actions;

export default billsSlice.reducer
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {E_OperationStatus, T_Operation, T_OperationsFilters, T_Bill} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_OperationsSlice = {
    draft_operation_id: number | null,
    bills_count: number | null,
    operation: T_Operation | null,
    operations: T_Operation[],
    filters: T_OperationsFilters,
    save_mm: boolean
}

const initialState:T_OperationsSlice = {
    draft_operation_id: null,
    bills_count: null,
    operation: null,
    operations: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchOperation = createAsyncThunk<T_Operation, string, AsyncThunkConfig>(
    "operations/operation",
    async function(operation_id) {
        const response = await api.operations.operationsRead(operation_id) as AxiosResponse<T_Operation>
        return response.data
    }
)

export const fetchOperations = createAsyncThunk<T_Operation[], object, AsyncThunkConfig>(
    "operations/operations",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.operations.operationsList({
            status: state.operations.filters.status,
            date_formation_start: state.operations.filters.date_formation_start,
            date_formation_end: state.operations.filters.date_formation_end
        }) as AxiosResponse<T_Operation[]>

        return response.data.filter(operation => operation.owner.includes(state.operations.filters.owner))
    }
)

export const removeBillFromDraftOperation = createAsyncThunk<T_Bill[], string, AsyncThunkConfig>(
    "operations/remove_bill",
    async function(bill_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.operations.operationsDeleteBillDelete(state.operations.operation.id, bill_id) as AxiosResponse<T_Bill[]>
        return response.data
    }
)

export const deleteDraftOperation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "operations/delete_draft_operation",
    async function(_, {getState}) {
        const state = getState()
        await api.operations.operationsDeleteDelete(state.operations.operation.id)
    }
)

export const sendDraftOperation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "operations/send_draft_operation",
    async function(_, {getState}) {
        const state = getState()
        await api.operations.operationsUpdateStatusUserUpdate(state.operations.operation.id)
    }
)

export const updateOperation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "operations/update_operation",
    async function(data, {getState}) {
        const state = getState()
        await api.operations.operationsUpdateUpdate(state.operations.operation.id, {
            ...data
        })
    }
)

export const updateBillValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "operations/update_mm_value",
    async function({bill_id, count},thunkAPI) {
        const state = thunkAPI.getState()
        await api.operations.operationsUpdateBillUpdate(state.operations.operation.id, bill_id, {count})
    }
)

export const acceptOperation = createAsyncThunk<void, string, AsyncThunkConfig>(
    "operations/accept_operation",
    async function(operation_id,{dispatch}) {
        await api.operations.operationsUpdateStatusAdminUpdate(operation_id, {status: E_OperationStatus.Completed})
        await dispatch(fetchOperations)
    }
)

export const rejectOperation = createAsyncThunk<void, string, AsyncThunkConfig>(
    "operations/accept_operation",
    async function(operation_id,{dispatch}) {
        await api.operations.operationsUpdateStatusAdminUpdate(operation_id, {status: E_OperationStatus.Rejected})
        await dispatch(fetchOperations)
    }
)

const operationsSlice = createSlice({
    name: 'operations',
    initialState: initialState,
    reducers: {
        saveOperation: (state, action) => {
            state.draft_operation_id = action.payload.draft_operation_id
            state.bills_count = action.payload.bills_count
        },
        removeOperation: (state) => {
            state.operation = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOperation.fulfilled, (state:T_OperationsSlice, action: PayloadAction<T_Operation>) => {
            state.operation = action.payload
        });
        builder.addCase(fetchOperations.fulfilled, (state:T_OperationsSlice, action: PayloadAction<T_Operation[]>) => {
            state.operations = action.payload
        });
        builder.addCase(removeBillFromDraftOperation.rejected, (state:T_OperationsSlice) => {
            state.operation = null
        });
        builder.addCase(removeBillFromDraftOperation.fulfilled, (state:T_OperationsSlice, action: PayloadAction<T_Bill[]>) => {
            if (state.operation) {
                state.operation.bills = action.payload as T_Bill[]
            }
        });
        builder.addCase(sendDraftOperation.fulfilled, (state:T_OperationsSlice) => {
            state.operation = null
        });
    }
})

export const { saveOperation, removeOperation, triggerUpdateMM, updateFilters } = operationsSlice.actions;

export default operationsSlice.reducer
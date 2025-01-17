import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface T_Bill {
  id: number;
  name: string;
  image: string;
  count: number;
}

interface T_Operat {
  id: string;
  address: string;
  status: number;
  date_created: string;
  bills: T_Bill[];
}

interface OperatState {
  loading: boolean;
  operation: T_Operat | null;
  error: string | null;
}

const initialState: OperatState = {
  loading: false,
  operation: null,
  error: null,
};

// Асинхронные Thunks
export const fetchOperation = createAsyncThunk(
  "operat/fetchOperation",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/operats/${id}/`);
      if (!response.ok) throw new Error("Ошибка загрузки операции");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBillCount = createAsyncThunk(
  "operat/updateBillCount",
  async (
    { id, billId, count }: { id: string; billId: number; count: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/operats/${id}/update_bill/${billId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
      });
      if (!response.ok) throw new Error("Ошибка обновления количества");
      const updatedBill = await response.json();
      return { billId, count: updatedBill.count };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBill = createAsyncThunk(
  "operat/deleteBill",
  async ({ id, billId }: { id: string; billId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/operats/${id}/delete_bill/${billId}/`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Ошибка удаления купюры");
      const updatedBills = await response.json();
      return updatedBills;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const operatSlice = createSlice({
  name: "operat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Operation
      .addCase(fetchOperation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperation.fulfilled, (state, action: PayloadAction<T_Operat>) => {
        state.loading = false;
        state.operation = action.payload;
      })
      .addCase(fetchOperation.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Bill Count
      .addCase(updateBillCount.fulfilled, (state, action: PayloadAction<{ billId: number; count: number }>) => {
        if (state.operation) {
          const bill = state.operation.bills.find((bill) => bill.id === action.payload.billId);
          if (bill) {
            bill.count = action.payload.count;
          }
        }
      })
      // Delete Bill
      .addCase(deleteBill.fulfilled, (state, action: PayloadAction<T_Bill[]>) => {
        if (state.operation) {
          state.operation.bills = action.payload;
        }
      })
      .addCase(deleteOperation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOperation.fulfilled, (state) => {
        state.loading = false;
        state.operation = null; // После удаления очищаем данные текущей операции
      })
      .addCase(deleteOperation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const formOperation = createAsyncThunk<
  void, // Возвращаемый тип
  { id: string }, // Тип аргумента
  { state: RootState } // Дополнительные параметры
>("operat/formOperation", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/operats/${id}/update_status_user/`, {
      method: "PUT",
      credentials: "include", // Для передачи cookies сессией
    });
    if (!response.ok) {
      throw new Error("Ошибка формирования операции");
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteOperation = createAsyncThunk(
  "operat/deleteOperation",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/operats/${id}/delete/`, {
        method: "DELETE",
        credentials: "include", // Для передачи cookies
      });

      if (!response.ok) {
        throw new Error("Ошибка удаления операции");
      }

      return id; // Возвращаем ID удаленной операции
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export default operatSlice.reducer;
export type { OperatState }; 
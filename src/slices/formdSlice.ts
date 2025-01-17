import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface MyOperat {
  id: number;
  status: number;
  date_formation: string | null;
}

interface MyOperatState {
  operats: MyOperat[];
  loading: boolean;
  error: string | null;
}

const initialState: MyOperatState = {
  operats: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для получения операций пользователя
export const fetchMyOperats = createAsyncThunk(
  "myOperat/fetchMyOperats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/operats/search/", { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки операций");
    }
  }
);

const myOperatSlice = createSlice({
  name: "myOperat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOperats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOperats.fulfilled, (state, action) => {
        state.operats = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyOperats.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default myOperatSlice.reducer;
export type { MyOperatState }; 
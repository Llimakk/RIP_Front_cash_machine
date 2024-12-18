import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk для добавления товара в корзину
export const addToCart = createAsyncThunk<number, number>(
  'cart/addToCart',
  async (billId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/bills/${billId}/add_to_operat/`);
      return response.data.cart_count; // Ожидается, что API вернет обновленный счетчик корзины
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка добавления в корзину');
    }
  }
);

interface CartState {
  count: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  count: 0,
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.count = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
export type { CartState }; 
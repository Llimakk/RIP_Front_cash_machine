import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "src/api";
// import { setCookie } from "./cookieSlice"; // Импорт setCookie из cookieSlice

interface LoginState {
  loading: boolean;
  error: string | null;
  success: boolean;
  userData: any | null;
}

const initialState: LoginState = {
  loading: false,
  error: null,
  success: false,
  userData: null,
};

// Асинхронный thunk для логина
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (loginData: any, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data; // Возвращаем данные пользователя (токен и др.)
    } catch (error: any) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;

export type { LoginState };

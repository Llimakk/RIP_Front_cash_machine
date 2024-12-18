import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api } from "src/api";

interface RegistrationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegistrationState = {
  loading: false,
  error: null,
  success: false,
};

// Асинхронный thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", 
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetRegistrationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRegistrationState } = registrationSlice.actions;

export default registrationSlice.reducer;

export type { RegistrationState };

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "store";

const selectSessionId = (state: RootState) => state.cookie.cookie;

// Асинхронная проверка сессии
export const checkSession = createAsyncThunk<
  { login: string; id_user: number }, // успешный ответ
  void, // без аргументов
  { rejectValue: string; state: RootState } // ошибка + доступ к state
>(
  "user/checkSession",
  async (_, { rejectWithValue, getState }) => {
    const sessionId = selectSessionId(getState());
    if (!sessionId) {
      return rejectWithValue("Сессия отсутствует");
    }

    try {
      const response = await axios.get(`/api/auth/session`, {
        headers: { Authorization: `Bearer ${sessionId}` },
        withCredentials: true,
      });
      return response.data; // Пример: { login: "user", id_user: 123 }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка проверки сессии");
    }
  }
);

// Асинхронное обновление данных пользователя
export const updateUserData = createAsyncThunk<
  { login: string }, // успешный ответ
  { userId: number; data: { login?: string; password?: string } }, // аргументы
  { rejectValue: string } // ошибка
>(
  "user/updateUserData",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, data);
      return response.data; // Ожидается, что ответ содержит обновленные данные пользователя
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Не удалось обновить данные пользователя"
      );
    }
  }
);

interface UserState {
  login: string;
  isAuth: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  cookie: string | null; // Cookie
  id_user: number | null; // ID пользователя
}

// Функция получения cookie
const getCookie = (): string | null => {
  const cookie = document.cookie
    .split(";")
    .find((row) => row.trim().startsWith("session_id="));
  return cookie ? cookie.split("=")[1] : null;
};

// Начальное состояние
const initialState: UserState = {
  login: "",
  isAuth: false,
  status: "idle",
  error: null,
  cookie: getCookie(),
  id_user: null,
};

// Слайс пользователя
const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ login: string; id_user: number }>) => {
      state.login = action.payload.login;
      state.isAuth = true;
      state.id_user = action.payload.id_user;
    },
    logoutUser: (state) => {
      state.login = "";
      state.isAuth = false;
      state.id_user = null;
      state.cookie = null;
      document.cookie = `session_id=; Max-Age=0; path=/;`; // Удаление cookie
    },
    setIdUser: (state, action: PayloadAction<number>) => {
      state.id_user = action.payload;
    },
    setCookie: (state, action: PayloadAction<string>) => {
      state.cookie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Проверка сессии
      .addCase(checkSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.login = action.payload.login;
        state.id_user = action.payload.id_user;
        state.isAuth = true;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка проверки сессии";
        state.isAuth = false;
      })

      // Обновление данных пользователя
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.login = action.payload.login;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка при обновлении данных";
      });
  },
});

export const { loginUser, logoutUser, setIdUser, setCookie } = userSlice.actions;

export default userSlice.reducer;

export type { UserState };

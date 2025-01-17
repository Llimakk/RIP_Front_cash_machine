import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { setIdUserR } from "./cookieSlice";
import axios from "axios";

interface UserState {
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    // date_joined: Date;
    // Дополнительные поля, которые есть в UserSerializer
  } | null;
  sessionId: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  sessionId: null,
  isAuth: false,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchData",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const sessionId = state.cookie.cookie;
    const userId = state.cookie.id_user;

    if (!sessionId) {
      console.error("Нет sessionId");
      return rejectWithValue("Пользователь не авторизован");
    }

    if (!userId) {
      console.error("Нет userId");
      return rejectWithValue("ID пользователя отсутствует");
    }

    try {
      console.log("Отправка запроса на сервер...");
      const response = await axios.get(`/api/users/${userId}/update/`, {
        headers: {
          Authorization: `Session ${sessionId}`,
        },
        withCredentials: true,
      });

      return response.data; // Возвращаем данные пользователя
    } catch (error: any) {
      console.error("Ошибка загрузки данных:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Ошибка загрузки данных");;
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { userId, data }: { userId: number; data: { [key: string]: any } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/api/users/${userId}/update/`, data, {
        withCredentials: true, // Для отправки cookies с запросом
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка при обновлении профиля");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
      state.isAuth = !!action.payload; // Обновляем isAuth на основе sessionId
    },
    clearSession: (state) => {
      state.sessionId = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log("Данные пользователя обновлены:", action.payload);
        state.user = action.payload;
        state.isAuth = true; // Считаем, что пользователь авторизован
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        alert("Профиль успешно обновлен!");
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        console.error("Ошибка обновления профиля:", action.payload);
        alert("Ошибка обновления профиля!");
      });
  },
});

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUserAsync",
  async (_, { dispatch }) => {
    try {
      const response = await axios.post("/api/users/logout/", {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Успешный выход
        dispatch(logoutUser());
        return response.data;
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error); // Просто логируем, не нужно показывать alert
    }
  }
);

export const { setUser, logoutUser, setSessionId, clearSession } = userSlice.actions;
export default userSlice.reducer;
export type { UserState };

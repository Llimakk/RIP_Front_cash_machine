import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getCookie = (): string | null => {
  const cookie = document.cookie
    .split(";")
    .find((row) => row.trim().startsWith("session_id="));
  return cookie ? cookie.split("=")[1] : null;
};

interface CookieState {
  cookie: string | null;
  id_user: number | null;
}

const initialState: CookieState = {
  cookie: getCookie(),
  id_user: null,
};

const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    setIdUserR: (state, action: PayloadAction<number>) => {
      state.id_user = action.payload;
    },
    setCookie: (state, action: PayloadAction<string>) => {
      state.cookie = action.payload;
    },
    delCookie: (state) => {
      state.cookie = null;
      document.cookie = `session_id=; Max-Age=0; path=/;`; // Удаление cookie
    },
  },
});

export const { setCookie, delCookie, setIdUserR } = cookieSlice.actions;
export default cookieSlice.reducer;
export type { CookieState }; 
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "src/api";
// import { setCartCount, setDraftId, setCartItems } from "src/slices/cartSlice";

// // Создаем Thunk для загрузки аудиторий
// export const fetchbills = createAsyncThunk(
//   "bills/fetchbills",
//   async (name: string, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await api.bills.billsSearchList({ name });
//       const data = response.data;

//       // Обновляем состояние через другие экшены
//       dispatch(setCartCount(data.bills_count || 0));
//       dispatch(setDraftId(data.draft_event || null));
//       dispatch(setCartItems(data.draft_bills || []));

//       return data.bills; // Возвращаем список аудиторий
//     } catch (error) {
//       console.error("Ошибка при загрузке аудиторий:", error);
//       return rejectWithValue("Не удалось загрузить данные аудиторий");
//     }
//   }
// );
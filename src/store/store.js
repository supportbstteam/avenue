import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";
import bookReducer from "@/store/bookSlice";
import adminReducer from "@/store/adminSlice";
import cartReducer from "@/store/cartSlice";
import userCategorySlice from "@/store/userCategorySlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    admin: adminReducer,
    cart: cartReducer,
    userCategory: userCategorySlice,
  },
});

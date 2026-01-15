import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";
import bookReducer from "@/store/bookSlice";
import adminReducer from "@/store/adminSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        book: bookReducer,
        admin: adminReducer,
    },
});

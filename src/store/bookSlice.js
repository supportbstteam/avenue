import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

const initialState = {
    title: "",
    isbn: "",
    author: "",
    price: 0,
    loading: false,
    error: null,
};

// 1️⃣ Create async thunk for API call
export const fetchBook = createAsyncThunk(
    "book/fetchBook",
    async (isbn) => {
        const response =await api.get(`/books/${isbn}`);
        return response.data;
    }
);

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBook(state, action) {
            state.title = action.payload.title;
            state.isbn = action.payload.isbn;
            state.author = action.payload.contributor;
            state.price = action.payload.price;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.loading = false;
                state.title = action.payload.title;
                state.isbn = action.payload.isbn;
                state.author = action.payload.contributor;
                state.price = action.payload.price;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setName } = bookSlice.actions;
export default bookSlice.reducer;

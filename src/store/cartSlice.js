import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchBookForAdmin = createAsyncThunk(
    "book/fetchBook",
    async (isbn) => {
        const response = await api.get(`/admin/books/${isbn}`);
        return response.data;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {
        addToCart(state, action) {
            const newBook = action.payload

            const existingBook = state.books.find(
                book => book._id === newBook._id
            )

            if (existingBook) {
                existingBook.quantity += newBook.quantity || 1
            } else {
                state.books.push({
                    ...newBook,
                    quantity: newBook.quantity || 1,
                })
            }
        },
        removeFromCart(state, action) {
            state.books = state.books.filter(
                book => book._id !== action.payload
            )
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload
            const book = state.books.find(book => book._id === id);
            if (book) {
                if (quantity <= 1 && book.quantity === 1) {
                    state.books = state.books.filter(book => book._id !== id)
                 }
                book.quantity = quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookForAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            ;
    },
});

export const { addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;

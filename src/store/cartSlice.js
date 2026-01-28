import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchCart = createAsyncThunk(
    "cart/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/cart");
            return res.data.items || [];
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


export const addToCart = createAsyncThunk(
    "cart/add",
    async ({ bookId, quantity = 1 }, { rejectWithValue }) => {
        try {
            const res = await api.post("/cart", { bookId, quantity });
            return res.data.items;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async ({ bookId, quantity }, { rejectWithValue }) => {
        try {
            const res = await api.put("/cart", { bookId, quantity });
            return res.data.items;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/remove",
    async (bookId, { rejectWithValue }) => {
        try {
            const res = await api.delete("/cart", {
                data: { bookId },
            });
            return res.data.items;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        books: [],
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        // addToCart(state, action) {
        //     const newBook = action.payload

        //     const existingBook = state.books.find(
        //         book => book._id === newBook._id
        //     )

        //     if (existingBook) {
        //         existingBook.quantity += newBook.quantity || 1
        //     } else {
        //         state.books.push({
        //             ...newBook,
        //             quantity: newBook.quantity || 1,
        //         })
        //     }
        // },
        // removeFromCart(state, action) {
        //     state.books = state.books.filter(
        //         book => book._id !== action.payload
        //     )
        // },
        clearCart(state) {
            state.items = [];
        },
        // updateQuantity(state, action) {
        //     const { id, quantity } = action.payload
        //     const book = state.books.find(book => book._id === id);
        //     if (book) {
        //         if (quantity <= 1 && book.quantity === 1) {
        //             state.books = state.books.filter(book => book._id !== id)
        //         }
        //         book.quantity = quantity;
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            // FETCH CART
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ADD TO CART
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE QUANTITY
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REMOVE ITEM
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// export const { addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

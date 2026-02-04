import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


/**
 * ------------------------------------------------------
 * ASYNC THUNK — Fetch root or category-specific data
 * ------------------------------------------------------
 */
export const fetchUserCategories = createAsyncThunk(
  "categories/fetch",
  async ({ category } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/category", {
        params: category ? { category } : {},
      });
    
      console.log(res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

/**
 * ------------------------------------------------------
 * INITIAL STATE
 * ------------------------------------------------------
 */
const initialState = {
  categories: [],         // root + lazy-loaded subcategories
  books: [],              // books of selected category
  selectedCategory: null, // selected category code

  // loading states
  initialLoading: true,
  categoryLoading: false,

  error: null,
};

/**
 * ------------------------------------------------------
 * SLICE
 * ------------------------------------------------------
 */
const userCategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /**
       * ------------------------------------------------------
       * PENDING
       * ------------------------------------------------------
       */
      .addCase(fetchUserCategories.pending, (state) => {
        state.error = null;
        state.categoryLoading = state.categories.length > 0;
        state.initialLoading = state.categories.length === 0;
      })

      /**
       * ------------------------------------------------------
       * FULFILLED
       * ------------------------------------------------------
       */
      .addCase(fetchUserCategories.fulfilled, (state, action) => {
        state.initialLoading = false;
        state.categoryLoading = false;

        const payload = action.payload || {};
        const responseType = payload.type;

        if (!responseType) {
          console.warn("⚠ Missing 'type' in API response");
          return;
        }

        /**
         * -------------------
         * ROOT RESPONSE
         * -------------------
         */
        if (responseType === "ROOT") {
          state.categories = Array.isArray(payload.categories)
            ? payload.categories
            : [];

          state.books = Array.isArray(payload.books)
            ? payload.books
            : [];

          state.selectedCategory = null;
          return;
        }

        /**
         * -------------------
         * CATEGORY RESPONSE
         * -------------------
         */
        if (responseType === "CATEGORY") {
          const selectedCode = payload?.selectedCategory?.code ?? null;
          state.selectedCategory = selectedCode;

          // Merge subcategories without duplicates
          const existingCodes = new Set(
            state.categories.map((c) => c.code)
          );

          if (Array.isArray(payload.subCategories)) {
            payload.subCategories.forEach((sub) => {
              if (!existingCodes.has(sub.code)) {
                state.categories.push(sub);
              }
            });
          }

          state.books = Array.isArray(payload.books)
            ? payload.books
            : [];
        }
      })

      /**
       * ------------------------------------------------------
       * REJECTED
       * ------------------------------------------------------
       */
      .addCase(fetchUserCategories.rejected, (state, action) => {
        state.initialLoading = false;
        state.categoryLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default userCategorySlice.reducer;

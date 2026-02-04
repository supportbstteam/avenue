import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * ----------------------------------------
 * Async Thunk
 * ----------------------------------------
 */
export const fetchUserCategories = createAsyncThunk(
  "categories/fetch",
  async ({ category } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/category", {
        params: category ? { category } : {},
      });

      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

/**
 * ----------------------------------------
 * Initial State
 * ----------------------------------------
 */
const initialState = {
  categories: [],           // flat list (root + loaded subcategories)
  books: [],                // books for selected category
  selectedCategory: null,   // currently selected category code

  // loading states
  initialLoading: true,     // only for first page load
  categoryLoading: false,   // for category clicks / expansion

  error: null,
};

/**
 * ----------------------------------------
 * Slice
 * ----------------------------------------
 */
const userCategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // future sync reducers go here
  },
  extraReducers: (builder) => {
    builder

      /**
       * ----------------------------------------
       * PENDING
       * ----------------------------------------
       */
      .addCase(fetchUserCategories.pending, (state) => {
        if (state.categories.length === 0) {
          state.initialLoading = true;
        } else {
          state.categoryLoading = true;
        }
        state.error = null;
      })

      /**
       * ----------------------------------------
       * FULFILLED
       * ----------------------------------------
       */
      .addCase(fetchUserCategories.fulfilled, (state, action) => {
        state.initialLoading = false;
        state.categoryLoading = false;

        const payload = action.payload;

        // ROOT LOAD
        if (payload?.type === "ROOT") {
          state.categories = payload.categories || [];
          state.books = payload.books || [];
          state.selectedCategory = null;
          return;
        }

        // CATEGORY CLICK
        if (payload?.type === "CATEGORY") {
          const selectedCode = payload.selectedCategory?.code;

          state.selectedCategory = selectedCode || null;

          // merge subcategories without duplicates
          const existingCodes = new Set(
            state.categories.map((c) => c.code)
          );

          (payload.subCategories || []).forEach((sub) => {
            if (!existingCodes.has(sub.code)) {
              state.categories.push(sub);
            }
          });

          state.books = payload.books || [];
        }
      })

      /**
       * ----------------------------------------
       * REJECTED
       * ----------------------------------------
       */
      .addCase(fetchUserCategories.rejected, (state, action) => {
        state.initialLoading = false;
        state.categoryLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default userCategorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * ----------------------------------------
 * FETCH (ADMIN)
 * ----------------------------------------
 */
export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async ({ page = 1, limit = 50 } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/category", {
        params: { page, limit },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

/**
 * ----------------------------------------
 * FETCH CATEGORY BY ID (ADMIN)
 * ----------------------------------------
 */
export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async ({ id, scheme }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/admin/category/${id}`, {
        params: scheme ? { scheme } : {},
      });
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch category details");
    }
  }
);

/**
 * ----------------------------------------
 * UPDATE CATEGORY (headingText / scheme / status)
 * ----------------------------------------
 */
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/admin/category/${id}`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to update category");
    }
  }
);

/**
 * ----------------------------------------
 * TOGGLE STATUS (FAST)
 * ----------------------------------------
 */
export const updateCategoryStatus = createAsyncThunk(
  "category/updateStatus",
  async ({ id, scheme, status }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/admin/category/${id}/status`, {
        scheme,
        status,
      });

      return { id, scheme, status };
    } catch (err) {
      return rejectWithValue("Failed to update status");
    }
  }
);

/**
 * ----------------------------------------
 * DELETE CATEGORY (CASCADE)
 * ----------------------------------------
 */
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/category/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete category");
    }
  }
);

/**
 * ----------------------------------------
 * SLICE
 * ----------------------------------------
 */
const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],

    selectedCategory: [], // 🔑 rows from /category/:id
    selectedLoading: false,
    selectedError: null,

    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /**
       * ========================
       * FETCH
       * ========================
       */
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.list = action.payload.data || [];
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * ========================
       * UPDATE CATEGORY
       * ========================
       */
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updated = action.payload;

        state.list = state.list.map((item) =>
          item._id === updated._id ? { ...item, ...updated } : item
        );
      })

      /**
       * ========================
       * TOGGLE STATUS (OPTIMISTIC)
       * ========================
       */
      .addCase(updateCategoryStatus.pending, (state, action) => {
        const { id, scheme, status } = action.meta.arg;

        const row = state.list.find((c) => c._id === id && c.scheme === scheme);

        if (row) {
          row.status = status; // ✅ optimistic UI
        }
      })

      .addCase(updateCategoryStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        const updated = action.payload; // { _id, status }

        const item = state.list.find((c) => c._id === updated._id);
        if (item) {
          item.status = updated.status; // ✅ confirm backend truth
          delete item._previousStatus;
        }
      })

      /**
       * ========================
       * DELETE CATEGORY
       * ========================
       */
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((c) => c._id !== id);
        state.total -= 1;
      })
      /**
       * ========================
       * FETCH CATEGORY BY ID
       * ========================
       */
      .addCase(fetchCategoryById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedCategory = action.payload.data || [];
      })

      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload;
      });
  },
});

export default categorySlice.reducer;

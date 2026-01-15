import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const res = await axios.get("/api/categories");
    return res.data;
  }
);

// Add category
export const addCategory = createAsyncThunk(
  "categories/add",
  async (payload) => {
    const res = await axios.post("/api/categories", payload);
    return res.data;
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }) => {
    const res = await axios.put(`/api/categories/${id}`, data);
    return res.data;
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    await axios.delete(`/api/categories/${id}`);
    return id;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder
      //-- Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch categories";
      })

      //-- Add
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      //-- Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      //-- Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((cat) => cat._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;

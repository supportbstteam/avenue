import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const res = await axios.get("/api/category");
    return res.data;
  }
);

const userCategorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //-- Fetch
      .addCase(fetchUserCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch categories";
      });
  },
});

export default userCategorySlice.reducer;

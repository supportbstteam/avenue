import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * =============================
 * FETCH CMS LIST
 * =============================
 */
export const fetchCMSPages = createAsyncThunk(
  "cms/fetchPages",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/cms");
      return res.data.data;
    } catch {
      return rejectWithValue("Failed to load CMS pages");
    }
  }
);

export const fetchCMSDetails = createAsyncThunk(
  "cms/details",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/admin/cms/${slug}`);
      return res.data.data;
    } catch {
      return rejectWithValue("Failed to load page");
    }
  }
);

/**
 * =============================
 * DELETE CMS PAGE
 * =============================
 */
export const deleteCMSPage = createAsyncThunk(
  "cms/delete",
  async (slug, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/cms/${slug}`);
      return slug;
    } catch {
      return rejectWithValue("Delete failed");
    }
  }
);

/**
 * =============================
 * SLICE
 * =============================
 */
const cmsSlice = createSlice({
  name: "cms",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchCMSPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCMSPages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCMSPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCMSDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCMSDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCMSDetails.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // DELETE
      .addCase(deleteCMSPage.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.slug !== action.payload);
      });
  },
});

export default cmsSlice.reducer;

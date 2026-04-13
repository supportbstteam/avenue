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
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load CMS pages"
      );
    }
  }
);

/**
 * =============================
 * FETCH SINGLE PAGE
 * =============================
 */
export const fetchCMSDetails = createAsyncThunk(
  "cms/details",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/admin/cms/${slug}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load page"
      );
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
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Delete failed");
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
    selected: null,
    loading: false,
    deleting: false,
    error: null,
  },

  reducers: {
    clearSelectedCMS: (state) => {
      state.selected = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /**
       * ================= FETCH LIST
       */
      .addCase(fetchCMSPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCMSPages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCMSPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * ================= FETCH DETAILS
       */
      .addCase(fetchCMSDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCMSDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCMSDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * ================= DELETE PAGE
       */
      .addCase(deleteCMSPage.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteCMSPage.fulfilled, (state, action) => {
        state.deleting = false;
        state.list = state.list.filter((p) => p.slug !== action.payload);

        if (state.selected?.slug === action.payload) {
          state.selected = null;
        }
      })
      .addCase(deleteCMSPage.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCMS } = cmsSlice.actions;
export default cmsSlice.reducer;

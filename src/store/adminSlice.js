import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";


export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchProfile",
  async () => {
    const response = await api.get("/admin/profile");
    const data = response.data;
    data.password = "";
    return data;
  }
);

// Update admin profile
export const updateAdminProfile = createAsyncThunk(
  "admin/updateProfile",
  async (formValues) => {
    const response = await api.put("/admin/profile", formValues);
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    id: "",
    name: "",
    email: "",
    role: "",
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload._id;
        state.email = action.payload.username;
        state.role = action.payload.role;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // update local state
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
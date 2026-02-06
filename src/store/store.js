import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";
import bookReducer from "@/store/bookSlice";
import adminReducer from "@/store/adminSlice";
import cartReducer from "@/store/cartSlice";
import userCategorySlice from "@/store/userCategorySlice";
import categoryReducer from "@/store/categorySlice";
import productReducer from "@/store/productSlice";
import adminUserSlice from "@/store/adminUserSlice";
import orderReducer from "@/store/orderSlice";
import addressReducer from "@/store/addressSlice";
import adminOrderReducer from "@/store/adminOrderSlice";
import dashboardReducer from "@/store/adminDashboardSlice";
import cmsReducer from "@/store/cmsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    admin: adminReducer,
    cart: cartReducer,
    userCategory: userCategorySlice,
    category: categoryReducer,
    products: productReducer,
    adminUsers: adminUserSlice,
    orders: orderReducer,
    address: addressReducer,
    adminOrders: adminOrderReducer,
    dashboard: dashboardReducer,
    cms: cmsReducer,
  },
});

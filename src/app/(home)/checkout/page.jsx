"use client";

import CheckoutItemCard from "@/components/cards/CheckoutItemsCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchCart } from "@/store/cartSlice";
import { fetchUserDetails } from "@/store/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const { items = [], loading } = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-gray-50">
      {!loading && items.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Checkout</h1>
          <p className="text-gray-600 mb-8">Complete your purchase</p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT: Cart Items */}
            <div className="flex-1 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <CheckoutItemCard key={item._id} item={item} />
                ))
              )}
            </div>

            {/* RIGHT: Payment */}
            <div className="w-full lg:w-[380px] bg-white rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

              {/* PayPal */}
              <button className="w-full border rounded-lg py-3 mb-3 font-medium hover:bg-gray-50 transition">
                Pay with PayPal
              </button>

              {/* Stripe */}
              <button className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-black/90 transition">
                Pay with Stripe
              </button>

              <div className="mt-6 border-t pt-4 text-sm text-gray-500">
                Secure checkout powered by PayPal & Stripe
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

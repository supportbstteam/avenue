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

  // console.log("Checkout items:", items[0]);

  const getOriginalPrice = (book) =>
    book?.productSupply?.prices?.[0]?.amount || 0;

  const getDiscountPercent = (book) =>
    book?.productSupply?.prices?.[0]?.discountPercent || 0;

  const getFinalPrice = (book) => {
    const price = getOriginalPrice(book);
    const discount = getDiscountPercent(book);
    return discount ? price - (price * discount) / 100 : price;
  };

  /* ---------------- TOTALS ---------------- */
  const subtotal = items.reduce((sum, item) => {
    if (!item.book) return sum;
    return sum + getFinalPrice(item.book) * item.quantity;
  }, 0);

  const shippingCost = subtotal > 25 ? 0 : 2.99;
  const total = subtotal + shippingCost;

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
                items.map((item) => {
                  console.log("Rendering checkout item:", item);
                  return(
                  <CheckoutItemCard  item={item} key={item?.book?._id} />
                )})
              )}
            </div>

            {/* RIGHT: Payment */}
              <div>
              <div className="bg-white rounded-lg shadow py-10 px-5" >
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Delivery</span>
                  <span>{shippingCost === 0 ? "FREE" : `£${shippingCost}`}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="w-full lg:w-[380px] mt-5 bg-white rounded-xl shadow p-6 h-fit">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                {/* PayPal */}
                <button className="w-full cursor-pointer border rounded-lg py-3 mb-3 font-medium hover:bg-gray-50 transition">
                  Pay with PayPal
                </button>

                {/* Stripe */}
                <button className="w-full bg-black cursor-pointer text-white rounded-lg py-3 font-medium hover:bg-black/90 transition">
                  Pay with Stripe
                </button>

                <div className="mt-6 border-t pt-4 text-sm text-gray-500">
                  Secure checkout powered by PayPal & Stripe
                </div>
              </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

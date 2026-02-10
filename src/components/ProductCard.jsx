"use client";

import Image from "next/image";
import Link from "next/link";
import afterDiscountPrice from "@/lib/afterDiscountPrice";
import { addToCart } from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { syncing } = useSelector((s) => s.cart);

  const { _id, image, preorder, availabilityStatus, isSellable } = product;



  console.log("-=-=-=-=--= preorder -=-=-=-=-",preorder);

  // ---------------- TITLE ----------------
  const title = product?.descriptiveDetail?.titles?.[0]?.text || "Untitled";

  // ---------------- AUTHOR ----------------
  const author = product?.descriptiveDetail?.contributors?.find(
    (c) => c.role === "A01"
  )?.nameInverted;

  // ---------------- FORMAT ----------------
  const ebookFormat = product?.ebookCategories?.[0] || null;

  const format =
    ebookFormat || product?.type || product?.descriptiveDetail?.productForm;

  // ---------------- PRICE ----------------
  const priceObj = product?.productSupply?.prices?.[0];

  const originalPrice = priceObj?.amount ? Number(priceObj.amount) : null;

  const discountPercent = priceObj?.discountPercent
    ? Number(priceObj.discountPercent)
    : 0;

  const finalPrice =
    originalPrice !== null
      ? afterDiscountPrice(originalPrice, discountPercent)
      : null;

  // ---------------- ADD TO CART ----------------
  const addToBasket = async () => {
    try {
      await dispatch(
        addToCart({
          bookId: _id,
          quantity: 1,
          ebookFormat,
        })
      ).unwrap();

      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add item");
    }
  };

  console.log("-=-=-=- product card -=-=-=-=-", product);

  // =================================================
  // UI
  // =================================================

  // console.log(product);

  return (
    <Link href={`/${_id}`} className="group shrink-0">
      {/* IMAGE */}
      <div className="relative w-full h-[340px] overflow-hidden group">
        <div>
          <Image src={image} alt={title} fill className="object-contain" />
        </div>

        {availabilityStatus === "available"}

        <div
          className="
            absolute bottom-0 left-0 w-full bg-gray-100 p-4 space-y-2
            opacity-100 translate-y-0
            md:opacity-0 md:translate-y-full
            md:group-hover:opacity-100 md:group-hover:translate-y-0
            transition-all duration-300
          "
        >
          {isSellable && availabilityStatus === "preorder" && (
            <button
              disabled
              className="w-full cursor-pointer bg-black text-white py-3 text-sm font-semibold"
            >
              PREORDER
            </button>
          )}

          {!isSellable && availabilityStatus === "out_of_stock" && (
            <button
              disabled
              className="w-full bg-yellow-500 text-black cursor-pointer py-3 text-sm font-semibold"
            >
              Out of Stock
            </button>
          )}

          {isSellable &&
            (availabilityStatus === "in_stock" ||
              availabilityStatus === "available" ||
              availabilityStatus === "to_order" ||
              availabilityStatus === "unknown" ||
              availabilityStatus === "pod") && (
              <button
                onClick={addToBasket}
                disabled={syncing}
                className="
                w-full bg-black text-white py-3 cursor-pointer text-sm font-semibold
                hover:bg-[#FF6A00] transition
                disabled:bg-gray-300
              "
              >
                {syncing ? "ADDING..." : "ADD TO BASKET"}
              </button>
            )}

          {/* {isSellable &&
            (availabilityStatus === "in_stock" ||
              availabilityStatus === "available" ||
              availabilityStatus === "to_order" ||
              availabilityStatus === "unknown" ||
              availabilityStatus === "pod") && (
              <button
                disabled
                className="w-full bg-yellow-500 text-black cursor-pointer py-3 text-sm font-semibold"
              >
                Out of Stock
              </button>
            )} */}
        </div>
      </div>

      {/* INFO */}
      <div className="mt-3 space-y-1 text-black">
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>

        {author && (
          <p className="text-sm text-[#FF6A00] font-medium">{author}</p>
        )}

        {format && <p className="text-sm text-gray-600 capitalize">{format}</p>}

        {/* PRICE */}
        {finalPrice !== null ? (
          <div className="flex gap-2 text-sm">
            {discountPercent > 0 && (
              <span className="line-through text-gray-400">
                £{originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-semibold">£{finalPrice}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Price not available</p>
        )}
      </div>
    </Link>
  );
}

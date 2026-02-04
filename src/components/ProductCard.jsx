"use client";

import Image from "next/image";
import Link from "next/link";
import afterDiscountPrice from "@/lib/afterDiscountPrice";
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const { _id, author, image, format, preorder } = product;

  const title =
    product?.descriptiveDetail?.titles?.[0]?.text ||
    "Untitled";

  const priceObj = product?.productSupply?.prices?.[0];

  // SAFE numeric values
  const originalPrice = priceObj?.amount
    ? Number(priceObj.amount)
    : null;

  const discountPercent = priceObj?.discountPercent
    ? Number(priceObj.discountPercent)
    : 0;

  const finalPrice =
    originalPrice !== null
      ? afterDiscountPrice(originalPrice, discountPercent)
      : null;

  const addToBasket = () => {
    dispatch(addToCart({ bookId: _id, quantity: 1 }));
    toast.success("Product added to cart");
  };

  return (
    <div className="group shrink-0">
      {/* Image */}
      <div className="relative w-full h-[340px] overflow-hidden group">
        <Link href={`/${_id}`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
          />
        </Link>

        <div className="absolute bottom-0 left-0 w-full bg-white p-4 space-y-2
          opacity-100 translate-y-0
          md:opacity-0 md:translate-y-full
          md:group-hover:opacity-100 md:group-hover:translate-y-0
          transition-all duration-300"
        >
          {preorder ? (
            <button
              disabled
              className="w-full bg-black text-white py-3 text-sm font-semibold"
            >
              PREORDER
            </button>
          ) : (
            <button
              onClick={addToBasket}
              className="w-full bg-teal-700 text-white py-3 text-sm font-semibold"
            >
              ADD TO BASKET
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1 text-black">
        <h3 className="text-sm font-semibold leading-tight">
          {title}
        </h3>

        {author && (
          <p className="text-sm text-[#336b75] font-medium">
            {author}
          </p>
        )}

        {format && (
          <p className="text-sm text-gray-600">
            {format}
          </p>
        )}

        {/* Price */}
        {finalPrice !== null ? (
          <div className="flex gap-2 text-sm">
            {discountPercent > 0 && (
              <span className="line-through text-gray-400">
                £{originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-semibold">
              £{finalPrice}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Price not available
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import afterDiscountPrice from "@/lib/afterDiscountPrice";
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  // console.log("Rendering ProductCard for product:", product);
  const { _id, author, image, format, preorder } = product;
  const title = product.descriptiveDetail.titles[0].text;
  const originalPrice = product.productSupply.prices[0].amount.toFixed(2);
  const discountPercent =
    product.productSupply.prices[0].discountPercent.toFixed(2);
  const price = afterDiscountPrice(originalPrice, discountPercent);

  const addToBasket = () => {
    // dispatch(addToCart(product));
    dispatch(addToCart({ bookId: _id, quantity: 1 }));
    toast.success("Product added to cart");
  };

  return (
    <div className="group  shrink-0">
      {/* Image */}
      <div className="relative w-full h-[340px] overflow-hidden group">
        <Link href={`/${_id}`}>
          <Image src={image} alt={title} fill className="object-contain" />
        </Link>
        <div className="absolute bottom-0 left-0 w-full bg-white p-4 space-y-2 opacity-100 translate-y-0 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
          {preorder ? (
            <button
              disabled
              className="w-full bg-black text-white py-3 text-sm font-semibold"
            >
              PREORDER
            </button>
          ) : (
            <>
              <button
                onClick={addToBasket}
                className="w-full bg-teal-700 text-white py-3 text-sm font-semibold"
              >
                ADD TO BASKET
              </button>
              {/* <button className="w-full bg-[#a48b6a] text-white py-3 text-sm font-semibold">
                CLICK & COLLECT
              </button> */}
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1 text-black">
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>

        {author && (
          <p className="text-sm text-[#336b75] font-medium">{author}</p>
        )}

        {format && <p className="text-sm text-gray-600">{format}</p>}

        {/* Price */}
        <div className="flex gap-2 text-sm">
          {originalPrice && (
            <span className="line-through text-gray-400">£{originalPrice}</span>
          )}
          <span className="font-semibold">£{price}</span>
        </div>
      </div>

      {/* Actions – hover on desktop, always on mobile */}
    </div>
  );
}

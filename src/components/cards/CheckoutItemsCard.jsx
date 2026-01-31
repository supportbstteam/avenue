import Image from "next/image";
import React from "react";

const CheckoutItemCard = ({ item }) => {
  const title =
    item.book?.descriptiveDetail?.titles?.[0]?.titleText || "Untitled Book";

  const price = item.book?.productSupply?.prices?.[0]?.amount || 0;
//   const currency = item.book?.productSupply?.prices?.[0]?.currency || "£";
  const currency =  "£";

  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-4">
      {/* Image wrapper */}
      <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={item?.book?.image || "/img/1.jpg"}
          alt={title}
          fill
          className="object-contain"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg leading-snug">{title}</h3>
        <p className="text-sm text-gray-500">
          Publisher: {item.book?.publisher?.name}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Qty: {item.quantity}
          </span>

          <span className="font-semibold">
            {currency} {(price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItemCard;

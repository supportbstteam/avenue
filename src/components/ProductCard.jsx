import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { _id, slug, title, author, image, price, originalPrice, format, preorder } = product;

  return (
    <div className="group  shrink-0">
      {/* Image */}
      <Link href={`/${_id}`}>
        <div className="relative w-full h-[340px] overflow-hidden group">
          <Image src={image} alt={title} fill className="object-contain" />

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
                <button className="w-full bg-teal-700 text-white py-3 text-sm font-semibold">
                  ADD TO BASKET
                </button>
                <button className="w-full bg-[#a48b6a] text-white py-3 text-sm font-semibold">
                  CLICK & COLLECT
                </button>
              </>
            )}
          </div>
        </div>
      </Link>

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
            <span className="line-through text-gray-400">
              £{originalPrice.toFixed(2)}
            </span>
          )}
          <span className="font-semibold">£{price.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions – hover on desktop, always on mobile */}
    </div>
  );
}

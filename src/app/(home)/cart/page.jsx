'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faMinus,
  faPlus,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateQuantity,
  removeFromCart,
} from '@/store/cartSlice'

export default function CartPage() {
  const dispatch = useDispatch()
  const { books } = useSelector((state) => state.cart)

  const getTitle = (book) =>
    book?.descriptiveDetail?.titles?.[0]?.text || 'Untitled'

  const getOriginalPrice = (book) =>
    book?.productSupply?.prices?.[0]?.amount || 0

  const getDiscountPercent = (book) =>
    book?.productSupply?.prices?.[0]?.discountPercent || 0

  const getFinalPrice = (book) => {
    const price = getOriginalPrice(book)
    const discount = getDiscountPercent(book)
    return discount ? price - (price * discount) / 100 : price
  }

  /* ---------------- TOTALS ---------------- */
  const subtotal = books.reduce(
    (sum, book) => sum + getFinalPrice(book) * book.quantity,
    0
  )

  const shippingCost = subtotal > 25 ? 0 : 2.99
  const total = subtotal + shippingCost

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* BREADCRUMB */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm">
          <Link href="/" className="text-[#336b75] hover:underline">
            Home
          </Link>{' '}
          / <span className="font-medium">Shopping Basket</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-2">
          Shopping Basket
        </h1>

        <p className="text-gray-600 mb-8">
          You have <b>{books.length}</b> item(s) in your basket
        </p>

        {books.length === 0 ? (
          <div className="bg-white p-12 text-center rounded">
            <h2 className="text-2xl font-bold mb-4">
              Your basket is empty
            </h2>
            <Link
              href="/"
              className="bg-[#336b75] text-white px-6 py-3 rounded-lg inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 bg-white rounded">
              {books.map((book) => {
                const title = getTitle(book)
                const price = getFinalPrice(book)

                return (
                  <div
                    key={book._id}
                    className="p-6 border-b last:border-b-0"
                  >
                    <div className="grid sm:grid-cols-4 gap-6">
                      {/* IMAGE */}
                      <div className="relative h-32">
                        <Image
                          src={book.image || '/img/1.jpg'}
                          alt={title}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* INFO */}
                      <div className="sm:col-span-3 flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {book.author}
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            {book.format}
                          </p>

                          {/* QUANTITY */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: book._id,
                                    quantity: book.quantity - 1,
                                  })
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>

                            <span className="font-semibold">
                              {book.quantity}
                            </span>

                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: book._id,
                                    quantity: book.quantity + 1,
                                  })
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>

                        {/* PRICE & REMOVE */}
                        <div className="text-right">
                          <p className="font-bold">
                            £{(price * book.quantity).toFixed(2)}
                          </p>

                          <button
                            onClick={() =>
                              dispatch(removeFromCart(book._id))
                            }
                            className="text-red-600 mt-2"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <Link
                href="/"
                className="flex items-center gap-2 p-6 text-[#336b75]"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </Link>
            </div>

            {/* SUMMARY */}
            <div className="bg-white p-6 rounded h-fit">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Delivery</span>
                <span>
                  {shippingCost === 0
                    ? 'FREE'
                    : `£${shippingCost}`}
                </span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>

              <button className="w-full mt-6 bg-[#336b75] text-white py-3 rounded">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

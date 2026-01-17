"use client";

import { useState } from "react";
// import Breadcrumb from './Breadcrumb';

export default function BookDetail({ book }) {
  const [expandDescription, setExpandDescription] = useState(false);

  //   const breadcrumbItems = [
  //     { label: 'Home', href: '/' },
  //     {
  //       label: book.title || 'Books',
  //       href: `/${book.title?.toLowerCase()}`
  //     },
  //   ];

  //   const discount = Math.round(
  //     ((book.originalPrice - book.price) / book.originalPrice) * 100
  //   );

  if (!book) return null;

  return (
    <div className="max-w-7xl mx-auto text-black px-4 py-10 space-y-2">
      {/* <Breadcrumb items={breadcrumbItems} currentPage={book.title} /> */}

      {/* MAIN LAYOUT */}
      <div className="grid cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT: IMAGE */}
        <div className="border p-4">
          <img
            src={book.image}
            alt={book.title}
            className="w-full object-contain"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="lg:col-span-1 space-y-6">
          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-serif font-semibold mb-3">
              {book.title}
            </h1>
            <h2 className="text-xl font-semibold mb-2">by {book.author}</h2>

            {book.series && (
              <p className="text-sm text-green-700 mb-6">
                Part of the {book.series} series
              </p>
            )}

            {/* BOOK META */}
            <div className="space-y-2 text-sm">
              <p>
                <b>Format:</b> {book.format}
              </p>
              <p>
                <b>Publisher:</b> {book.publisher}
              </p>
              <p>
                <b>Publication Date:</b> {book.publicationDate}
              </p>
              {/* <p><b>Category:</b> {book.category.join(', ')}</p> */}
              <p>
                <b>ISBN:</b> {book.isbn}
              </p>
            </div>
          </div>

          {/* PRICE BOX */}
          <div className="border p-4 space-y-3">
            <div className="flex items-center justify-center gap-4">
              {/* <span className="line-through text-gray-400">
                £{book.price.toFixed(2)}
              </span>

              <span className="text-2xl font-bold">
                £{book.price.toFixed(2)}
              </span> */}

              {book.saleTag && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {book.saleTag} -{discount}%
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="w-full border text-[#336b75] px-6 py-3 font-semibold hover:bg-[#336b75] hover:text-white transition">
                Sign in to Add to Wishlist
              </button>

              <button className="w-full bg-[#336b75] text-white px-6 py-3 font-semibold hover:bg-white hover:text-[#336b75] border border-[#336b75] transition">
                ADD TO BASKET
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10 md:mt-16">
        <div className="border-t pt-10">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-serif text-3xl">Description</h2>
            <div className="flex-1 h-px bg-sky-200" />
          </div>

          {/* INTRO */}
          <p className="font-bold text-lg mb-6">{book.intro}</p>

          {/* DESCRIPTION TEXT */}
          <p className="text-gray-800 leading-relaxed mb-8">
            {expandDescription ? book.fullDescription : book.description}
          </p>

          {/* FEATURES */}
          {expandDescription && (
            <>
              <p className="font-semibold mb-4">Features:</p>
              <ul className="space-y-2 mb-4">
                {book.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </>
          )}

          {/* TOGGLE */}
          <button
            onClick={() => setExpandDescription(!expandDescription)}
            className="text-sky-600 hover:underline font-medium"
          >
            {expandDescription ? "… read less" : "… read more"}
          </button>
        </div>
      </div>
    </div>
  );
}

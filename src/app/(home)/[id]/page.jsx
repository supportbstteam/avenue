"use client";

import ProductSlider from "@/components/ProductSlider";
import BookDetail from "@/components/BookDetail";
import { useState, useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooksForHome } from "@/store/bookSlice";
import { fetchBookForHome } from "@/store/bookSlice";
import { notFound } from "next/navigation";
import reverseName from "@/lib/reverseName";

export default function BookPage({ params }) {
  const { id } = use(params);

  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const [book, setBook] = useState([]);

  useEffect(() => {
    dispatch(fetchBooksForHome({ search: id }));
    dispatch(fetchBookForHome(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (books) {
      const updatedBook = books.map((item, index) => ({
        ...item,
        author: reverseName(item.author),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setBook(updatedBook);
    }
  }, [books]);
    
  useEffect(() => {
    console.log("sp", books);
  }, [books]);

  if (!book) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <BookDetail book={book[0]} />

      <div className="max-w-7xl mx-auto px-4">
        <ProductSlider
          title="Recently Reviewed"
          seeMoreUrl="/books"
          products={book}
          slidesPerView={5}
          autoplayDelay={2500}
          showArrows
          showDots={false}
          loop
        />
      </div>
    </div>
  );
}

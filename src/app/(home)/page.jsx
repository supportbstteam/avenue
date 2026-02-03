"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BannerSlider from "@/components/BannerSlider";
import SaleHighlights from "@/components/SaleHighlights";
import ProductSlider from "@/components/ProductSlider";
import BookSlider from "@/components/BookSlider";
import Link from "next/link";
import BlogSection from "@/components/BlogSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksForHome } from "@/store/bookSlice";
import reverseName from "@/lib/reverseName";
import { fetchUserDetails } from "@/store/userSlice";

export default function HomePage() {
  const {
    loading,
    error,
    books,
    bestsellers,
    popular,
    special_editions,
    coming_soon,
    fiction,
    non_fiction,
    recently_reviewed,
    paperback_books,
    children_books,
    adult_books,
    gift_books,
  } = useSelector((state) => state.book);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);
  const [row4, setRow4] = useState([]);
  const [row5, setRow5] = useState([]);
  const [row6, setRow6] = useState([]);
  const [row7, setRow7] = useState([]);
  const [row8, setRow8] = useState([]);
  const [row9, setRow9] = useState([]);
  const [row10, setRow10] = useState([]);
  const [row11, setRow11] = useState([]);

  useEffect(() => {
    dispatch(
      fetchBooksForHome({ category: "bestsellers", limit: 10, page: 1 })
    );
    dispatch(fetchBooksForHome({ category: "popular", limit: 10, page: 2 }));
    dispatch(
      fetchBooksForHome({ category: "special_editions", limit: 10, page: 3 })
    );
    dispatch(
      fetchBooksForHome({ category: "coming_soon", limit: 10, page: 4 })
    );
    dispatch(fetchBooksForHome({ category: "fiction", limit: 10, page: 5 }));
    dispatch(
      fetchBooksForHome({ category: "non_fiction", limit: 10, page: 6 })
    );
    dispatch(
      fetchBooksForHome({ category: "recently_reviewed", limit: 10, page: 7 })
    );
    dispatch(
      fetchBooksForHome({ category: "paperback_books", limit: 10, page: 8 })
    );
    dispatch(
      fetchBooksForHome({ category: "children_books", limit: 10, page: 9 })
    );
    dispatch(
      fetchBooksForHome({ category: "adult_books", limit: 10, page: 10 })
    );
    dispatch(
      fetchBooksForHome({ category: "gift_books", limit: 10, page: 11 })
    );
    dispatch(fetchUserDetails());
  }, []);

  // console.log("User Data on Home Page:", user);

  useEffect(() => {
    if (bestsellers) {
      const row = bestsellers.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow1(row);
    }
    if (popular) {
      const row = popular.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow2(row);
    }
    if (special_editions) {
      const row = special_editions.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow3(row);
    }
    if (coming_soon) {
      const row = coming_soon.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: true,
      }));
      setRow4(row);
    }
    if (fiction) {
      const row = fiction.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow5(row);
    }
    if (non_fiction) {
      const row = non_fiction.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow6(row);
    }
    if (recently_reviewed) {
      const row = recently_reviewed.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow7(row);
    }
    if (paperback_books) {
      const row = paperback_books.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow8(row);
    }
    if (children_books) {
      const row = children_books.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow9(row);
    }
    if (adult_books) {
      const row = adult_books.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow10(row);
    }
    if (gift_books) {
      const row = gift_books.map((item, index) => ({
        ...item,
        author: reverseName(
          item.descriptiveDetail.contributors[0].nameInverted
        ),
        image: `/img/${index + 1}.jpg`,
        format: "Paperback",
        preorder: false,
      }));
      setRow11(row);
    }
  }, [
    books,
    bestsellers,
    popular,
    special_editions,
    coming_soon,
    fiction,
    non_fiction,
    recently_reviewed,
    paperback_books,
    children_books,
    adult_books,
    gift_books,
  ]);

  const highlights = [
    {
      id: 1,
      label: "Bestsellers",
      iconSrc: "/img/icons/bestseller.webp",
      href: "/bestsellers",
    },
    {
      id: 2,
      label: "Fiction",
      iconSrc: "/img/icons/fictionreb.webp",
      href: "/fiction",
    },
    {
      id: 3,
      label: "Non-Fiction",
      iconSrc: "/img/icons/non-fiction.webp",
      href: "/non-fiction",
    },
    {
      id: 4,
      label: "Children's",
      iconSrc: "/img/icons/childrens.webp",
      href: "/childrens",
    },
    {
      id: 5,
      label: "Stationery",
      iconSrc: "/img/icons/stationary.webp",
      href: "/stationery",
    },
    {
      id: 6,
      label: "Calendars & Diaries",
      iconSrc: "/img/icons/calenderdiary.webp",
      href: "/calendars-diaries",
    },
  ];

  const highlights2 = [
    {
      id: 1,
      label: "Bestsellers",
      iconSrc: "/img/icons/sale_highlight.webp",
      href: "/bestsellers",
    },
    {
      id: 2,
      label: "Fiction",
      iconSrc: "/img/icons/sale-hight-3.webp",
      href: "/fiction",
    },
    {
      id: 3,
      label: "Non-Fiction",
      iconSrc: "/img/icons/sale-higl-4.webp",
      href: "/non-fiction",
    },
    {
      id: 4,
      label: "Children's",
      iconSrc: "/img/icons/salehight-2.webp",
      href: "/childrens",
    },
  ];

  const products = [
    {
      id: "1",
      slug: "let-them-theory",
      title: "The Let Them Theory",
      author: "Mel Robbins",
      image: "/img/whenthecreanes.webp",
      price: 18.99,
      originalPrice: 22.99,
      format: "Paperback",
      preorder: true,
    },
    {
      id: "2",
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      image: "/img/housemaidbook.jpg",
      price: 8.99,
      originalPrice: 10.99,
      format: "Paperback",
      preorder: false,
    },
    {
      id: "3",
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      image: "/img/whenthecreanes.webp",
      price: 8.99,
      originalPrice: 10.99,
      format: "Paperback",
      preorder: false,
    },
    {
      id: "4",
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      image: "/img/whenthecreanes.webp",
      price: 8.99,
      originalPrice: 10.99,
      format: "Paperback",
      preorder: false,
    },
    {
      id: "5",
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      image: "/img/murderatmountfuji.jpg",
      price: 8.99,
      originalPrice: 10.99,
      format: "Paperback",
      preorder: false,
    },
    {
      id: "6",
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      image: "/img/housemaidbook.jpg",
      price: 8.99,
      originalPrice: 10.99,
      format: "Paperback",
      preorder: false,
    },
    {
      id: "7",
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      image: "/img/murderatmountfuji.jpg",
      price: 8.99,
      originalPrice: 10.99,
      format: "Paperback",
      preorder: false,
    },
    {
      id: "8",
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      image: "/img/murderatmountfuji.jpg",
      price: 8.99,
      originalPrice: 10.99,
      format: "Paperback",
      preorder: false,
    },
  ];

  const products2 = [...products];

  const slides = [
    {
      title: "PROTEIN in 15",
      subtitle: "Protein packed meals from the Body Coach",
      link: "/",
      image: "/img/sprinkbanner/joewiocl.webp",
    },
    {
      title: "DONUT SQUAD",
      subtitle: "Another sprinkling of madness with the Donut Squad",
      link: "/",
      image: "/img/sprinkbanner/speinklink.webp",
    },
    {
      title: "NEW BOOKS!",
      subtitle: "The Biggest and Best Publishing Out Now",
      link: "/",
      image: "/img/sprinkbanner/newbboks.webp",
    },
    {
      title: "NEW BOOKS!",
      subtitle: "The Biggest and Best Publishing Out Now",
      link: "/",
      image: "/img/sprinkbanner/speinklink.webp",
    },
  ];

  const banners = [
    {
      id: 1,
      imageUrl: "/img/waterstons-banner-3.webp",
      alt: "Winter Sale - Up to 50% off",
      href: "/",
    },
    {
      id: 2,
      imageUrl: "/img/waterrstones-banner2.webp",
      alt: "New Releases Available Now",
      href: "/",
    },
    {
      id: 3,
      imageUrl: "/img/waterstonesbanner-1.webp",
      alt: "Join Waterstones Plus for exclusive perks",
      href: "/",
    },
  ];
  return (
    <div className="bg-white">
      <BannerSlider
        slides={banners}
        showArrows={false}
        autoSlide
        interval={5000}
      />

      <SaleHighlights
        saletitle="Discover Our Sale Highlights"
        highlights={highlights}
      />

      <ProductSlider
        title="Our Bestsellers"
        seeMoreUrl="/"
        products={row1}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <BookSlider slidespace={40} slidesitem={3} slides={slides} />

      <ProductSlider
        title="Everyone's Talking About..."
        seeMoreUrl="/"
        products={row2}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <ProductSlider
        title="Signed & Special Editions"
        seeMoreUrl="/"
        products={row3}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <ProductSlider
        title="Coming Soon - The Biggest Books Coming in 2026"
        seeMoreUrl="/"
        products={row4}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image
            src="/img/image_slider.webp"
            alt="image_slider"
            width={1400}
            height={200}
            className="object-cover w-full"
          />
        </Link>
      </div>

      <ProductSlider
        title="Coming Soon - The Biggest Books Coming in 2026"
        seeMoreUrl="/"
        products={row4}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <ProductSlider
        title="Our Bestselling Paperbacks"
        seeMoreUrl="/"
        products={row8}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <SaleHighlights
        saletitle="You May Be Looking For..."
        highlights={highlights2}
      />

      <ProductSlider
        title="Our Best Fiction Books"
        seeMoreUrl="/"
        products={row5}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <ProductSlider
        title="Our Best Non-Fiction Books"
        seeMoreUrl="/"
        products={row6}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image
            src="/img/main_bannerbottom.jpeg"
            alt="image_slider"
            width={1400}
            height={200}
            className="object-cover w-full"
          />
        </Link>
      </div>

      <ProductSlider
        title="Recently Reviewed"
        seeMoreUrl="/"
        products={row7}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <ProductSlider
        title="Our Best Children's Books"
        seeMoreUrl="/"
        products={row9}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image
            src="/img/bottom-2banner.jpeg"
            alt="image_slider"
            width={1400}
            height={200}
            className="object-cover w-full"
          />
        </Link>
      </div>

      <ProductSlider
        title="Our Best Young Adult Books"
        seeMoreUrl="/"
        products={row10}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <ProductSlider
        title="Our Bestselling Stationery & Gifts"
        seeMoreUrl="/"
        products={row11}
        slidesPerView={5}
        autoplayDelay={2500}
        showArrows
        showDots={false}
        loop
      />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image
            src="/img/bottom-3banner.jpeg"
            alt="image_slider"
            width={1400}
            height={200}
            className="object-cover w-full"
          />
        </Link>
      </div>

      <BlogSection />
    </div>
  );
}

import Image from "next/image";
import BannerSlider from "@/components/BannerSlider";
import SaleHighlights from "@/components/SaleHighlights";
import ProductSlider from "@/components/ProductSlider";
import BookSlider from "@/components/BookSlider";
import Link from "next/link";
import BlogSection from "@/components/BlogSection";

export default function HomePage() {
  const highlights = [
    { id: 1, label: "Bestsellers", iconSrc: "/img/icons/bestseller.webp", href: "/bestsellers" },
    { id: 2, label: "Fiction", iconSrc: "/img/icons/fictionreb.webp", href: "/fiction" },
    { id: 3, label: "Non-Fiction", iconSrc: "/img/icons/non-fiction.webp", href: "/non-fiction" },
    { id: 4, label: "Children's", iconSrc: "/img/icons/childrens.webp", href: "/childrens" },
    { id: 5, label: "Stationery", iconSrc: "/img/icons/stationary.webp", href: "/stationery" },
    { id: 6, label: "Calendars & Diaries", iconSrc: "/img/icons/calenderdiary.webp", href: "/calendars-diaries" },
  ];

  const highlights2 = [
    { id: 1, label: "Bestsellers", iconSrc: "/img/icons/sale_highlight.webp", href: "/bestsellers" },
    { id: 2, label: "Fiction", iconSrc: "/img/icons/sale-hight-3.webp", href: "/fiction" },
    { id: 3, label: "Non-Fiction", iconSrc: "/img/icons/sale-higl-4.webp", href: "/non-fiction" },
    { id: 4, label: "Children's", iconSrc: "/img/icons/salehight-2.webp", href: "/childrens" },
  ];

  const products = [
    { id: "1", slug: "let-them-theory", title: "The Let Them Theory", author: "Mel Robbins", image: "/img/whenthecreanes.webp", price: 18.99, originalPrice: 22.99, format: "Paperback", preorder: true },
    { id: "2", slug: "hamnet", title: "Hamnet", author: "Maggie O'Farrell", image: "/img/housemaidbook.jpg", price: 8.99, originalPrice: 10.99, format: "Paperback", preorder: false },
    { id: "3", slug: "hamnet", title: "Hamnet", author: "Maggie O'Farrell", image: "/img/whenthecreanes.webp", price: 8.99, originalPrice: 10.99, format: "Paperback", preorder: false },
    { id: "4", slug: "hamnet", title: "Hamnet", author: "Maggie O'Farrell", image: "/img/whenthecreanes.webp", price: 8.99, originalPrice: 10.99, format: "Paperback", preorder: false },
    { id: "5", slug: "hamnet", title: "Hamnet", author: "Maggie O'Farrell", image: "/img/murderatmountfuji.jpg", price: 8.99, originalPrice: 10.99, format: "Paperback", preorder: false },
    { id: "6", slug: "hamnet", title: "Hamnet", author: "Maggie O'Farrell", image: "/img/housemaidbook.jpg", price: 8.99, originalPrice: 10.99, format: "Paperback", preorder: false },
    { id: "7", slug: "hamnet", title: "Hamnet", author: "Maggie O'Farrell", image: "/img/murderatmountfuji.jpg", price: 8.99, originalPrice: 10.99, format: "Paperback", preorder: false },
    { id: "8", slug: "hamnet", title: "Hamnet", author: "Maggie O'Farrell", image: "/img/murderatmountfuji.jpg", price: 8.99, originalPrice: 10.99, format: "Paperback", preorder: false },
  ];

  const products2 = [...products];

  const slides = [
    { title: "PROTEIN in 15", subtitle: "Protein packed meals from the Body Coach", link: "/", image: "/img/sprinkbanner/joewiocl.webp" },
    { title: "DONUT SQUAD", subtitle: "Another sprinkling of madness with the Donut Squad", link: "/", image: "/img/sprinkbanner/speinklink.webp" },
    { title: "NEW BOOKS!", subtitle: "The Biggest and Best Publishing Out Now", link: "/", image: "/img/sprinkbanner/newbboks.webp" },
    { title: "NEW BOOKS!", subtitle: "The Biggest and Best Publishing Out Now", link: "/", image: "/img/sprinkbanner/speinklink.webp" },
  ];

  const banners = [
    { id: 1, imageUrl: "/img/waterstons-banner-3.webp", alt: "Winter Sale - Up to 50% off", href: "/" },
    { id: 2, imageUrl: "/img/waterrstones-banner2.webp", alt: "New Releases Available Now", href: "/" },
    { id: 3, imageUrl: "/img/waterstonesbanner-1.webp", alt: "Join Waterstones Plus for exclusive perks", href: "/" },
  ];

  return (
    <div className="bg-white">
      <BannerSlider slides={banners} showArrows={false} autoSlide interval={5000} />

      <SaleHighlights saletitle="Discover Our Sale Highlights" highlights={highlights} />

      <ProductSlider title="Our Bestsellers" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <BookSlider slidespace={40} slidesitem={3} slides={slides} />

      <ProductSlider title="Everyone's Talking About..." seeMoreUrl="/" products={products2} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <ProductSlider title="Signed & Special Editions" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <ProductSlider title="Coming Soon - The Biggest Books Coming in 2026" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image src="/img/image_slider.webp" alt="image_slider" width={1400} height={200} className="object-cover w-full" />
        </Link>
      </div>

      <ProductSlider title="Coming Soon - The Biggest Books Coming in 2026" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <ProductSlider title="Our Bestselling Paperbacks" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <SaleHighlights saletitle="You May Be Looking For..." highlights={highlights2} />

      <ProductSlider title="Our Best Fiction Books" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <ProductSlider title="Our Best Non-Fiction Books" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image src="/img/main_bannerbottom.jpeg" alt="image_slider" width={1400} height={200} className="object-cover w-full" />
        </Link>
      </div>

      <ProductSlider title="Recently Reviewed" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <ProductSlider title="Our Best Children's Books" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image src="/img/bottom-2banner.jpeg" alt="image_slider" width={1400} height={200} className="object-cover w-full" />
        </Link>
      </div>

      <ProductSlider title="Our Best Young Adult Books" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <ProductSlider title="Our Bestselling Stationery & Gifts" seeMoreUrl="/" products={products} slidesPerView={5} autoplayDelay={2500} showArrows showDots={false} loop />

      <div className="page-width">
        <Link href="/" className="min-w-full block relative">
          <Image src="/img/bottom-3banner.jpeg" alt="image_slider" width={1400} height={200} className="object-cover w-full" />
        </Link>
      </div>

      <BlogSection />
    </div>
  );
}

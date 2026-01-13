import Link from "next/link";
import {
  faLocationDot,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const mainMenu = [
    { label: "Sale", href: "/sale" },
    { label: "Bestsellers", href: "/bestsellers" },
    { label: "Highlights", href: "/highlights" },
    { label: "Fiction", href: "/fiction" },
    { label: "Non-Fiction", href: "/non-fiction" },
    { label: "Children's", href: "/children" },
    { label: "Stationery & Gifts", href: "/stationery" },
    { label: "Games", href: "/games" },
  ];

  const utilityMenu = [
    { label: "Shop Finder", href: "/shops", icon: faLocationDot },
    { label: "Help", href: "/help" },
    { label: "Events", href: "/events" },
    { label: "Blog", href: "/blog" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Win", href: "/win" },
  ];

  return (
    <header className="w-full flex flex-col bg-white">

      {/* SALE BAR */}
      <div className="bg-[#ae0001] flex items-center justify-center text-white text-center py-1 text-sm font-semibold">
        <span className="mr-4 text-3xl font-cursive">SALE</span>
        <Link href="#" className="underline text-[10px]">
          SHOP NOW
        </Link>
      </div>

      {/* UTILITY BAR */}
      <div className="flex justify-between items-center px-6 py-2 text-sm">
        <div className="flex font-light gap-5 text-black uppercase">
          {utilityMenu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 hover:underline border-r border-slate-300 pr-2 last:border-r-0"
            >
              {item.icon && (
                <FontAwesomeIcon icon={item.icon} className="w-3 h-3" />
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 text-gray-700">
          <Link href="/account" className="hover:underline border-r border-slate-300 pr-2 flex gap-1 items-center">
            <FontAwesomeIcon icon={faUser} className="w-3 h-3" /> Account
          </Link>

          <Link
            href="/plus"
            className="flex gap-1 font-semibold hover:underline border-r border-slate-300 pr-2 items-center"
          >
            <img src="/img/plus-stamp.webp" className="h-5" />
            Join
            <img src="/img/plus-green.webp" className="h-5" />
          </Link>

          <Link href="/wishlist" className="hover:underline flex items-center gap-1">
            <img src="/img/heart.webp" className="w-5 h-5" />
            Wish List
          </Link>
        </div>
      </div>

      {/* LOGO */}
      <div className="py-6 text-center flex justify-center">
        <img src="/img/avenuemain.png" className="" />
      </div>

      {/* NAV + SEARCH */}
      <div className="flex items-center gap-6 px-6 py-3 border-y border-slate-200">

        {/* MAIN NAV */}
        <nav className="flex gap-5 text-[14px] uppercase font-medium text-[#336b75]">
          {mainMenu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:underline whitespace-nowrap border-r pr-2 border-[#336b75] last:border-r-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* SEARCH BAR */}
        <div className="ml-auto flex border rounded overflow-hidden bg-[#eaeff2]">
          <input
            type="text"
            placeholder="Search Title, Author, Keyword..."
            className="px-3 text-slate-900 py-2 text-sm w-64 outline-none"
          />
          <button className="px-3">
            <img src="/img/circle.png" className="w-5" />
          </button>
        </div>

        {/* BASKET */}
        <div className="flex flex-col text-slate-700 items-center gap-1 cursor-pointer text-sm">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="font-medium">Basket</span>
        </div>
      </div>

      {/* DELIVERY BAR */}
      <div className="bg-[#e9e7e2] text-black text-sm p-1 text-center">
        Free UK delivery on orders over £25, otherwise £2.99
      </div>
    </header>
  );
}

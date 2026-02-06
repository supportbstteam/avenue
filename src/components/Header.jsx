"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  faLocationDot,
  faUser,
  faCartShopping,
  faChevronDown,
  faBars,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchBooksForHome, setReduxSearchText } from "@/store/bookSlice";
import { fetchCart } from "@/store/cartSlice";
import HeaderUser from "./cards/HeaderUser";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items = [], loading } = useSelector((state) => state.cart);
  const { user, loading: userLoading } = useSelector((state) => state?.user);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const mainMenu = [
    { label: "Bestsellers", href: "/category/H" },
    { label: "New Books", href: "/category" },
    { label: "Highlights", href: "/highlights" }, // Only this will have mega menu
    { label: "Fiction", href: "/category/A" },
    { label: "Children's", href: "/category/Y" },
    { label: "Language", href: "/category/C" },
    { label: "Games", href: "/category/S" },
  ];

  const utilityMenu = [
    { label: "Shop Finder", href: "/shops", icon: faLocationDot },
    { label: "Help", href: "/help" },
    { label: "Events", href: "/events" },
    { label: "Blog", href: "/blog" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Win", href: "/win" },
  ];

  const toggleMobileDropdown = (key) => {
    setMobileDropdownOpen(mobileDropdownOpen === key ? null : key);
  };

  const handleSearch = () => {
    dispatch(fetchBooksForHome({ search: searchText }));
    dispatch(setReduxSearchText(searchText));
    router.push("/search");
  };

  return (
    <header className="w-full flex flex-col bg-white">
      {/* SALE BAR */}
      <div className="bg-[#FF6A00] flex items-center justify-center text-white text-center py-1 text-xs sm:text-sm font-semibold">
        <span className="mr-2 sm:mr-4 text-xl sm:text-3xl font-cursive">SALE</span>
        <Link href="#" className="underline text-[8px] sm:text-[10px]">SHOP NOW</Link>
      </div>

      {/* UTILITY BAR - HIDDEN ON MOBILE */}
      <div className="hidden lg:flex justify-end items-center px-4 lg:px-6 py-2 text-sm">
        <div className="flex gap-3 lg:gap-4 text-gray-700 text-xs lg:text-sm">
          {/* ACCOUNT DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredDropdown("account")}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="hover:underline border-r border-slate-300 pr-2 lg:pr-3 flex items-center gap-1 transition">
              <FontAwesomeIcon icon={faUser} className="w-3 h-3" /> Account
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`w-3 h-3 transition ${hoveredDropdown === "account" ? "rotate-180" : ""}`}
              />
            </button>

            {user && !userLoading ? (
              <HeaderUser hoveredDropdown={hoveredDropdown} />
            ) : (
              <div
                className={`absolute top-full right-0 mt-0 w-48 bg-white border border-slate-200 rounded shadow-lg transition-all duration-200 origin-top ${hoveredDropdown === "account"
                  ? "opacity-100 visible scale-y-100"
                  : "opacity-0 invisible scale-y-95"
                }`}
              >
                <Link
                  href="/auth/user/login"
                  className="block px-4 py-3 hover:bg-slate-50 border-b border-slate-100 text-gray-700 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/user/register"
                  className="block px-4 py-3 hover:bg-slate-50 text-gray-700 font-medium text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOGO & MOBILE HEADER */}
      <div className="py-3 sm:py-4 lg:py-6 text-center flex justify-between lg:justify-center items-center px-4">
        <button className="lg:hidden text-[#336b75]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>

        <a href="/">
          <img src="/img/avenuemain.png" alt="Logo" className="h-8 sm:h-10 lg:h-12 w-auto" />
        </a>

        <div className="flex lg:hidden gap-3 items-center">
          <button className="text-[#336b75]" onClick={() => setSearchOpen(!searchOpen)}>
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
          </button>
          <Link href="/wishlist" className="text-[#336b75]">
            <img src="/img/heart.webp" className="w-5 h-5" alt="Wishlist" />
          </Link>
          <div className="flex flex-col text-[#336b75] items-center gap-0.5 cursor-pointer text-xs">
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="font-medium">0</span>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {searchOpen && (
        <div className="lg:hidden px-4 pb-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex border rounded overflow-hidden bg-[#eaeff2]"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="px-3 text-slate-900 py-2 text-sm flex-1 outline-none"
            />
            <button type="submit" className="px-3">
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t text-[#000] border-slate-200 px-4 py-4 space-y-2">
          {mainMenu.map((item) => {
            const isDropdownMenu = item.label === "Highlights";
            const dropdownKey = "highlights";

            return (
              <div key={item.label}>
                <button
                  onClick={() => isDropdownMenu && toggleMobileDropdown(dropdownKey)}
                  className="w-full text-left flex items-center justify-between py-2 px-3 rounded hover:bg-slate-100 text-[#336b75] font-medium text-sm"
                >
                  {item.label}
                  {isDropdownMenu && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`w-3 h-3 transition ${mobileDropdownOpen === dropdownKey ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* MOBILE SUBMENU */}
                {isDropdownMenu && mobileDropdownOpen === dropdownKey && (
                  <div className="pl-4 space-y-1">
                    <Link href="/highlights/bestsellers" className="block py-2 px-3 text-gray-600 text-xs hover:bg-slate-50 rounded">
                      Bestsellers
                    </Link>
                    <Link href="/highlights/new-arrivals" className="block py-2 px-3 text-gray-600 text-xs hover:bg-slate-50 rounded">
                      New Arrivals
                    </Link>
                    <Link href="/highlights/editor-picks" className="block py-2 px-3 text-gray-600 text-xs hover:bg-slate-50 rounded">
                      Editor's Picks
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {/* MOBILE UTILITY MENU */}
          <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
            {utilityMenu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100 text-gray-700 text-xs"
              >
                {item.icon && <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
          </div>

          {/* MOBILE AUTH BUTTONS */}
          <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
            <Link
              href="/auth/user/login"
              className="block w-full py-2 px-3 rounded bg-[#336b75] text-white text-center font-medium text-sm hover:bg-[#2a5560]"
            >
              Sign In
            </Link>
            <Link
              href="/auth/user/register"
              className="block w-full py-2 px-3 rounded border border-[#336b75] text-[#336b75] text-center font-medium text-sm hover:bg-slate-50"
            >
              Register
            </Link>
          </div>
        </nav>
      )}

      {/* DESKTOP NAV + SEARCH */}
      <div className="hidden lg:flex items-center gap-6 px-6 py-3 border-y border-slate-200">
        {/* MENU */}
          
          <nav className="flex gap-6 text-[14px] uppercase font-medium text-[#000]">
  {mainMenu.map((item, index) => {
    const isDropdownMenu = item.label === "Highlights";
    const dropdownKey = "Highlights";

    return (
      <div
        key={item.label}
        className="relative group" // 🔥 group wrapper keeps hover stable
      >
        {/* MAIN MENU BUTTON */}
        <Link
          className={`relative flex items-center gap-1 whitespace-nowrap transition
            after:content-['|'] after:text-[#336b75] after:ml-4 after:mr-1
            ${index === mainMenu.length - 1 ? "after:content-['']" : ""}
            group-hover:text-[#FF6A00] 
          `}
          href={item.href}
        >
          {item.label.toUpperCase()}
          {isDropdownMenu && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-3 h-3 transition duration-200 group-hover:rotate-180`}
            />
          )}
        </Link>

        {/* MEGA MENU ONLY FOR HIGHLIGHTS */}
        {isDropdownMenu && (
          <div
            className="
              absolute left-0 top-full
              bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]
              border-t border-slate-200
              py-8 px-10 z-50
              transition-all duration-200
              min-w-max
              mt-4
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible group-hover:mt-2
            "
          >
            <div className="grid grid-cols-3 gap-10">
              <div>
                <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide">
                  Popular Highlights
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/highlights/bestsellers" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Bestsellers</Link></li>
                  <li><Link href="/highlights/new-arrivals" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">New Arrivals</Link></li>
                  <li><Link href="/highlights/editor-picks" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Editor's Picks</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide">Genres</h3>
                <ul className="space-y-2">
                  <li><Link href="/highlights/fiction" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Fiction</Link></li>
                  <li><Link href="/highlights/non-fiction" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Non-Fiction</Link></li>
                  <li><Link href="/highlights/children" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Children's</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide">Special Offers</h3>
                <ul className="space-y-2">
                  <li><Link href="/highlights/sale" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Sale</Link></li>
                  <li><Link href="/highlights/exclusive" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Exclusive</Link></li>
                  <li><Link href="/highlights/limited-edition" className="text-gray-600 hover:text-[#FF6A00] text-[13px] block">Limited Edition</Link></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  })}
</nav>


        {/* SEARCH */}
        <div className="ml-auto flex border rounded overflow-hidden bg-[#eaeff2]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex border rounded overflow-hidden bg-[#eaeff2]"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="px-3 text-slate-900 py-2 text-sm flex-1 outline-none"
            />
            <button type="submit" className="px-3">
              <img src="/img/circle.png" className="w-5" alt="Search" />
            </button>
          </form>
        </div>

        {/* BASKET */}
        <div
          onClick={() => router.push("/cart")}
          className="relative flex flex-col items-center gap-1 cursor-pointer text-sm text-slate-700 hover:text-[#336b75] transition"
        >
          <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
          {!loading && items.length > 0 && (
            <span className="absolute -top-2 -right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[11px] font-semibold text-white bg-[#336b75] rounded-full">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
          <span className="font-medium">Basket</span>
        </div>
      </div>

      {/* DELIVERY INFO */}
      <div className="bg-[#e9e7e2] text-black text-xs sm:text-sm p-1 text-center">
        Free UK delivery on orders over £25, otherwise £2.99
      </div>
    </header>
  );
}

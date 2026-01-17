'use client';

import Link from "next/link";
import {
  faLocationDot,
  faUser,
  faCartShopping,
  faChevronDown,
  faBars,
  faTimes,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";

export default function Header() {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

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
    {
      label: "Shop Finder",
      href: "/shops",
      icon: faLocationDot,
    },
    {
      label: "Help",
      href: "/help",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Gift Cards",
      href: "/gift-cards",
    },
    {
      label: "Win",
      href: "/win",
    },
  ];

  const categoryDropdowns = {
    fiction: [
      { label: "Literary Fiction", href: "/fiction/literary" },
      { label: "Mystery & Thriller", href: "/fiction/mystery" },
      { label: "Romance", href: "/fiction/romance" },
      { label: "Science Fiction", href: "/fiction/sci-fi" },
      { label: "Fantasy", href: "/fiction/fantasy" },
    ],
    nonFiction: [
      { label: "Biography", href: "/non-fiction/biography" },
      { label: "History", href: "/non-fiction/history" },
      { label: "Self-Help", href: "/non-fiction/self-help" },
      { label: "Travel", href: "/non-fiction/travel" },
      { label: "Business", href: "/non-fiction/business" },
    ],
    children: [
      { label: "Picture Books", href: "/children/picture-books" },
      { label: "Young Readers", href: "/children/young-readers" },
      { label: "Teen", href: "/children/teen" },
      { label: "Educational", href: "/children/educational" },
    ],
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdownOpen(mobileDropdownOpen === key ? null : key);
  };

  return (
    <header className="w-full flex flex-col bg-white">
      {/* SALE BAR */}
      <div className="bg-[#ae0001] flex items-center justify-center text-white text-center py-1 text-xs sm:text-sm font-semibold">
        <span className="mr-2 sm:mr-4 text-xl sm:text-3xl font-cursive">SALE</span>
        <Link href="#" className="underline text-[8px] sm:text-[10px]">
          SHOP NOW
        </Link>
      </div>

      {/* UTILITY BAR - HIDDEN ON MOBILE */}
      <div className="hidden lg:flex justify-between items-center px-4 lg:px-6 py-2 text-sm">
        <div className="flex font-light gap-3 lg:gap-5 text-black uppercase text-xs lg:text-sm">
          {utilityMenu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 hover:underline border-r border-slate-300 pr-2 lg:pr-3 last:border-r-0"
            >
              {item.icon && (
                <FontAwesomeIcon icon={item.icon} className="w-3 h-3" />
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

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
                className={`w-3 h-3 transition ${
                  hoveredDropdown === "account" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* ACCOUNT DROPDOWN MENU */}
            <div
              className={`absolute top-full right-0 mt-0 w-48 bg-white border border-slate-200 rounded shadow-lg transition-all duration-200 origin-top ${
                hoveredDropdown === "account"
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
          </div>

          <Link
            href="/plus"
            className="flex gap-1 font-semibold hover:underline border-r border-slate-300 pr-2 lg:pr-3"
          >
            <img src="/img/plus-stamp.webp" className="h-4 lg:h-5" alt="Plus" /> Join{" "}
            <img src="/img/plus-green.webp" className="h-4 lg:h-5" alt="Plus Green" />
          </Link>

          <Link href="/wishlist" className="hover:underline items-center gap-1 flex">
            <img src="/img/heart.webp" className="w-4 lg:w-5 h-4 lg:h-5" alt="Wishlist" /> Wish List
          </Link>
        </div>
      </div>

      {/* LOGO & MOBILE HEADER */}
      <div className="py-3 sm:py-4 lg:py-6 text-center flex justify-between lg:justify-center items-center px-4">
        <button
          className="lg:hidden text-[#336b75]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>

        <a href="/"><img src="/img/avenuemain.png" alt="Logo" className="h-8 sm:h-10 lg:h-12 w-auto" /></a>

        <div className="flex lg:hidden gap-3 items-center">
          <button
            className="text-[#336b75]"
            onClick={() => setSearchOpen(!searchOpen)}
          >
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
          <div className="flex border rounded overflow-hidden bg-[#eaeff2]">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 text-slate-900 py-2 text-sm flex-1 outline-none"
            />
            <button className="px-3">
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-slate-200 px-4 py-4 space-y-2">
          {mainMenu.map((item) => {
            const isDropdownMenu =
              item.label === "Fiction" ||
              item.label === "Non-Fiction" ||
              item.label === "Children's";
            const dropdownKey =
              item.label === "Fiction"
                ? "fiction"
                : item.label === "Non-Fiction"
                ? "nonFiction"
                : "children";

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
                      className={`w-3 h-3 transition ${
                        mobileDropdownOpen === dropdownKey ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* MOBILE SUBMENU */}
                {isDropdownMenu && mobileDropdownOpen === dropdownKey && (
                  <div className="pl-4 space-y-1">
                    {categoryDropdowns[dropdownKey]?.map(
                      (subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block py-2 px-3 text-gray-600 text-xs hover:bg-slate-50 rounded"
                        >
                          {subItem.label}
                        </Link>
                      )
                    )}
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
        <nav className="flex gap-5 text-[14px] uppercase font-medium text-[#336b75]">
          {mainMenu.map((item) => {
            const isDropdownMenu =
              item.label === "Fiction" ||
              item.label === "Non-Fiction" ||
              item.label === "Children's";
            const dropdownKey =
              item.label === "Fiction"
                ? "fiction"
                : item.label === "Non-Fiction"
                ? "nonFiction"
                : "children";

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => isDropdownMenu && setHoveredDropdown(dropdownKey)}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <button
                  className={`hover:underline whitespace-nowrap border-r pr-2 border-[#336b75] last:border-r-0 flex items-center gap-1 transition ${
                    hoveredDropdown === dropdownKey ? "text-[#0066cc]" : ""
                  }`}
                >
                  {item.label}
                  {isDropdownMenu && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`w-3 h-3 transition ${
                        hoveredDropdown === dropdownKey ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* CATEGORY DROPDOWN MENU */}
                {isDropdownMenu && (
                  <div
                    className={`absolute top-full left-0 mt-0 w-56 bg-white border border-slate-200 rounded shadow-lg transition-all duration-200 origin-top ${
                      hoveredDropdown === dropdownKey
                        ? "opacity-100 visible scale-y-100"
                        : "opacity-0 invisible scale-y-95"
                    }`}
                  >
                    {categoryDropdowns[dropdownKey]?.map(
                      (subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 text-gray-700 font-medium text-sm"
                        >
                          {subItem.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* SEARCH */}
        <div className="ml-auto flex border rounded overflow-hidden bg-[#eaeff2]">
          <input
            type="text"
            placeholder="Search Title, Author, Keyword..."
            className="px-3 text-slate-900 py-2 text-sm w-64 outline-none"
          />
          <button className="px-3">
            <img src="/img/circle.png" className="w-5" alt="Search" />
          </button>
        </div>

        {/* BASKET */}
        <div className="flex flex-col text-slate-700 items-center gap-1 cursor-pointer text-sm hover:text-[#336b75] transition">
          <FontAwesomeIcon icon={faCartShopping} />{" "}
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

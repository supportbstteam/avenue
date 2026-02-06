"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCMSPages } from "@/store/cmsSlice";

import {
  faXTwitter,
  faSquareFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  const dispatch = useDispatch();

  const { list: pages, loading } = useSelector((s) => s.cms);

  // ================= LOAD CMS =================
  useEffect(() => {
    if (!pages.length) {
      dispatch(fetchCMSPages());
    }
  }, [dispatch]);

  // ================= GROUP BY LEVEL =================
  const group = (lvl) => pages.filter((p) => Number(p.level || 0) === lvl);

  const columns = [
    { title: "SHOPPING WITH US", level: 1 },
    { title: "LEGAL", level: 2 },
    { title: "ABOUT AVENUE", level: 3 },
  ];

  const socialLinks = [
    { label: "X", href: "https://x.com", icon: faXTwitter },
    { label: "Facebook", href: "https://facebook.com", icon: faSquareFacebook },
    { label: "Instagram", href: "https://instagram.com", icon: faInstagram },
    { label: "TikTok", href: "https://tiktok.com", icon: faTiktok },
    { label: "YouTube", href: "https://youtube.com", icon: faYoutube },
  ];

  return (
    <footer className="bg-[#363636] text-gray-200">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* CMS COLUMNS */}
        {columns.map((col) => {
          const items = group(col.level);

          return (
            <div key={col.level}>
              <h4 className="text-sm font-semibold tracking-widest mb-4">
                {col.title}
              </h4>

              <ul className="space-y-2 text-sm">
                {loading && <li className="text-gray-500">Loading...</li>}

                {!loading && items.length === 0 && (
                  <li className="text-gray-500">No pages</li>
                )}

                {items.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/cms/${page.slug}`}
                      className="hover:underline text-gray-300"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* SOCIAL */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest mb-4">
            FOLLOW US
          </h4>

          <ul className="space-y-3 text-sm">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  target="_blank"
                  className="flex items-center gap-3 hover:underline"
                >
                  <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                  <span>{social.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-neutral-700 text-xs text-gray-400 px-6 py-4 text-center">
        © AVENUE, 2026.
      </div>
    </footer>
  );
}

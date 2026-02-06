import Link from "next/link";
import {
  faXTwitter,
  faSquareFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  const footerLinks = [
    {
      title: "SHOPPING WITH US",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Bookshops", href: "/bookshops" },
        { label: "Click & Collect", href: "/click-collect" },
        { label: "Delivery Options", href: "/delivery" },
        { label: "Online Pricing", href: "/pricing" },
        { label: "Returning Items", href: "/returns" },
        { label: "Student Discount", href: "/student-discount" },
        { label: "Waterstones Gift Cards", href: "/gift-cards" },
        { label: "Frequently Asked Questions", href: "/faqs" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Accessibility", href: "/accessibility" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Manage Cookies", href: "/manage-cookies" },
        { label: "Modern Slavery Statement", href: "/modern-slavery" },
        {
          label: "Privacy Notice - How We Use Your Information",
          href: "/privacy",
        },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Gender Pay Gap Report", href: "/gender-pay-gap" },
        { label: "Complaints Process", href: "/complaints" },
        { label: "Waterstones Review Policy", href: "/reviews-policy" },
      ],
    },
    {
      title: "ABOUT WATERSTONES",
      links: [
        { label: "About us", href: "/about" },
        { label: "Affiliates", href: "/affiliates" },
        { label: "Careers at Waterstones", href: "/careers" },
        { label: "Hatchards", href: "/hatchards" },
        { label: "Independent Publishers", href: "/publishers" },
        { label: "Waterstones Account Sales", href: "/account-sales" },
        { label: "Waterstones App", href: "/app" },
        {
          label: "Waterstones Children's Laureate",
          href: "/childrens-laureate",
        },
        { label: "Waterstones Plus", href: "/plus" },
      ],
    },
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

        {/* LINK COLUMNS */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold tracking-widest mb-4">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:underline text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

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
        © Waterstones, 2026. Waterstones Booksellers Limited. Registered in
        England and Wales. Company number 00610095. Registered office address:
        203–206 Piccadilly, London, W1J 9HD.
      </div>

    </footer>
  );
}

"use client";

import LogoutButton from "@/components/LogoutButton";

export default function Header() {
  return (
    <header className="w-full h-14 bg-white shadow px-6 flex items-center justify-end">
      <LogoutButton />
    </header>
  );
}

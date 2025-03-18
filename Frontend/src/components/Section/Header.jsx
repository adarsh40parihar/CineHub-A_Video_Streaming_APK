"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown, Mic, User } from "lucide-react";
// Remove the inappropriate import
// import { href, NavLink } from "react-router-dom";
// import ProfileSheet from "../atom/ProfileSheet";

export const navLinks = [
  { name: "Home", key: "", href: "/" },
  { name: "Movies", key: "movies", href: "/movies" },
  { name: "Tv Shows", key: "tv", href: "/tv" },
  { name: "Watchlist", key: "watchlist", href: "/watchlist" },
  { name: "Jio+", key: "jio+", href: "/jio+" },
];

export default function Header() {
  //  anything that start with use are hooks
  const path = usePathname();
  const activeTabKey = path.split("/")[1];
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="bg-[#0d0e10] py-4 w-full fixed top-0 z-50 border-b-2 border-b-zinc-600">
      <div className="lg:mx-auto mx-2 lg:px-4 flex items-center text-nowrap">
        <div className="flex">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="JioCinema Logo"
              width={136}
              height={36}
              className="md:h-9 md:max-w-[136px] max-w-24"
            />
          </Link>

          <Link
            href="/subscription"
            className="ml-4 mr-4 md:px-4 px-4 py-1 font-medium rounded-3xl flex items-center gap-2 text-[#c1a362] border-[#c1a362] border text-sm md:text-base"
          >
            <Image src="/crown.svg" height={16} width={16} alt="crown" />
            <span className="pr-4">Go Premium</span>
          </Link>
        </div>
        <nav className="lg:flex lg:space-x-4 space-x-0 hidden">
          {navLinks.map((tab) => (
            <Link
              href={tab.href}
              key={tab.key}
              className={`px-1 py-2 font-semibold text-[#b6b8b8] hover:text-white ${
                activeTabKey === tab.key
                  ? "border-b-2 border-pink-500 text-white"
                  : ""
              } `}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end w-full">
          <div
            className={`relative flex items-center bg-[#121212] border rounded-full px-3 py-2 transition-all duration-200 ${
              isSearchFocused
                ? "border-gray-500 shadow-md w-80"
                : "border-gray-700 hover:border-gray-600 w-72"
            }`}
          >
            <Search className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Movies, Shows and more"
              className="bg-transparent outline-none w-full text-sm font-semibold text-gray-300 placeholder-gray-500"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <Mic className="h-5 w-5 text-gray-500 ml-1 cursor-pointer" />
          </div>
          {/* <ProfileSheet /> */}
        </div>
      </div>
    </header>
  );
}

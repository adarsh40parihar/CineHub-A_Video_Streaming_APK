"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown, Mic, User } from "lucide-react";
import ProfileSheet from "@/components/Section/ProfileSheet";
import { useSelector } from "react-redux";

export const navLinks = [
  { name: "Home", key: "", href: "/" },
  { name: "Movies", key: "movies", href: "/movies" },
  { name: "Tv Shows", key: "tv", href: "/tv" },
  { name: "Watchlist", key: "watchlist", href: "/watchlist" },
  { name: "CinePlus", key: "CinePlus", href: "/cineplus" },
];

export default function Header() {
  //  anything that start with use are hooks
  const path = usePathname();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const activeTabKey = path.split("/")[1];
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const SearchResult = () => {
    if (searchQuery == "") return;
    setLoading(true);
    router.push(`/search?query=${searchQuery}`);
    setLoading(false);
    setIsSearchFocused(false);
    document.activeElement.blur();
  }
    if (loading) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader2 className="animate-spin md:h-[50px] md:w-[50px] h-[35px] w-[35px] text-gray-300" />
        </div>
      );
    }

  return (
    <header className="bg-[#0d0e10] py-4 w-full fixed top-0 z-50 border-b-2 border-b-zinc-600">
      <div className="lg:mx-auto mx-2 lg:px-4 flex items-center text-nowrap">
        <div className="flex">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="CineHub Logo"
              width={140}
              height={44}
              className="md:h-11 md:max-w-[140px] max-w-24 mr-4"
            />
          </Link>

          <Link
            href="/subscription"
            className="mr-4 md:px-4 px-4 py-1 font-medium rounded-3xl hidden sm:flex items-center gap-2 text-[#c1a362] border-[#c1a362] border text-sm md:text-base"
          >
            <Image src="/crown.svg" height={16} width={16} alt="crown" />
            <span className="pr-4">
              {isLoggedIn
                ? user.isPremium
                  ? `Premium: ${
                      user.premiumType.charAt(0).toUpperCase() +
                      user.premiumType.slice(1)
                    }`
                  : "Go Premium"
                : "Go Premium"}
            </span>
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
                ? "border-gray-500 shadow-md w-full sm:w-72"
                : "border-gray-700 hover:border-gray-600 w-full sm:w-60"
            }`}
          >
            <Search className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm font-semibold text-gray-300 placeholder-gray-500"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? SearchResult() : null)}
            />
            <Mic className="h-5 w-5 text-gray-500 ml-1 cursor-pointer" />
          </div>
          <ProfileSheet />
        </div>
      </div>
    </header>
  );
}

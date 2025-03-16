"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import JioCinemaLogo from "@/../public/jio_cinema_logo.svg";
import { Search, ChevronDown, Mic, User } from "lucide-react";
import CrownLogo from "@/../public/crown.svg";
import { UserSheet } from "./UserSheet";

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 border-b-2 border-[#2a2a2a]">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={JioCinemaLogo}
            alt="JioCinema Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-white ">JioCinema</span>
        </Link>
        <Link href="/subscription">
          <Button
            variant="outline"
            className="hidden sm:inline-flex bg-transparent text-yellow-400 border-yellow-400 hover:bg-gray-900 hover:text-yellow-600 rounded-full text-base"
          >
            <Image src={CrownLogo} alt="Crown Logo" />
            <span className="m-0">Go Premium</span>
          </Button>
        </Link>

        <nav className="hidden lg:flex items-left space-x-6 pl-8">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/movies" className="hover:text-gray-300">
            Movies
          </Link>
          <Link href="/tv" className="hover:text-gray-300">
            Tv Shows
          </Link>
          <Link href="/watchlist" className="hover:text-gray-300">
            Watchlist
          </Link>
          <Link href="/jioplus" className="hover:text-gray-300">
            Jio+
          </Link>
        </nav>
      </div>

      <div className="flex items-center">
        <div
          className={`relative rounded-full bg-[#2a2a2a] flex items-center px-4 py-2 mr-4 transition-all ${
            isSearchFocused ? "w-80 shadow-lg" : "w-64"
          } focus-within:w-80`}
        >
          <Search className="h-6 w-6 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Movies, Shows and more"
            className="bg-transparent outline-none w-full text-sm"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <Mic className="h-6 w-6 text-gray-400 ml-2 hover:bg-gray-700 rounded-full" />
        </div>
        <UserSheet />
        {/* <div className="relative">
          <button className="flex items-center justify-center h-10 w-10 bg-[#2a2a2a] rounded-full">
            <User className="h-6 w-6" />
          </button>
        </div> */}
      </div>
    </header>
  );
}

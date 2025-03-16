"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Pic from "@/../public/profile.webp";

export function UserSheet() {
  const [open, setOpen] = useState(false); // Manage sheet state

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition"
        >
          <Image
            src={Pic}
            alt="Guest Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] bg-gray-900 text-white border-l border-[#2a2a2a]">
        <SheetHeader className="relative border-b border-[#2a2a2a] pb-4">
          <SheetTitle className="text-white text-xl font-bold">
            Profile
          </SheetTitle>
          {/* Profile Section */}
          <div className="flex flex-col items-center bg-[#191919] rounded-xl p-4">
            <div className="relative w-24 h-24 mb-3">
              <Image
                src={Pic}
                alt="Guest Avatar"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
            <span className="text-xl font-semibold">Guest</span>
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-24 bg-[#E11D48]/80 hover:bg-[#E11D48]/60 text-white text-base font-semibold rounded-full">
                Login
              </Button>
            </Link>
          </div>
        </SheetHeader>

        {/* Menu Items */}
        <div className="mt-4 space-y-1 font-bold">
          <Link
            href="/subscription"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-4 py-3 text-gray-200 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition"
          >
            <span className="font-bold">Subscribe Now</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
          <hr className="border-[#2a2a2a] mx-4 font-semibold" />

          {[
            { label: "Home", href: "/" },
            { label: "Movies", href: "/movies" },
            { label: "Tv Shows", href: "/tv-shows" },
            { label: "Watchlist", href: "/watchlist" },
            { label: "Jio+", href: "/jioplus" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition"
            >
              <span className="font-medium">{item.label}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

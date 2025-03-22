"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import { navLinks } from "./Header";



function SheetSide() {
    const [open, setOpen] = useState(false); 

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Image
          src="/profile.png"
          alt="Profile Icon"
          className="ml-4 h-10 w-10 rounded-full"
          width={40}
          height={40}
        />
      </SheetTrigger>
      <SheetContent side={"right"} className="px-6 overflow-auto scrollbar-hide">
        <div className="bg-slate-700/30 p-6 flex flex-col items-center gap-2 mt-[80px] rounded-lg">
          <Image
            src="/profile.png"
            alt="Profile Icon"
            className="h-[100px] w-[100px] rounded-full -mt-[60px]"
            width={40}
            height={40}
          />
          <p className="text-xl font-bold capitalize">Guest</p>
          <Link
            href={"/login"}
            className="rounded-full font-semibold mt-4 text-base px-4 py-2 bg-pink-600"
            onClick={() => {
              setOpen(false);
            }}
          >
            Login
          </Link>
        </div>
        <div className="divide-y my-4">
          <Link
            href={"/subscription"}
            className="flex items-center justify-between px-2 py-4 text-sm"
            onClick={() => {
              setOpen(false);
            }}
          >
            Subscribe Now
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
          <div>
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="flex items-center justify-between px-2 py-4 text-sm"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {link.name}
                <ExternalLinkIcon className="w-4 h-4" />
              </Link>
            ))}
          </div>
          <Link
            href={"/"}
            className="flex items-center justify-between px-2 py-4 text-sm"
          >
            Help and Legal
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetSide;

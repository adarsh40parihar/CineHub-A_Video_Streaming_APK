"use client";
import CategoriesSection from "@/components/Section/CategoriesSection";
import { Button } from "@/components/ui/button";
import { FolderLockIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function JioPlusWatch() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>
      {isLoggedIn ? (
        <div>Jio+ Premium Videos</div>
      ) : (
        <div>
          <div className="px-6 pt-7 text-2xl">Jio+ Premium Videos</div>
          <div className="flex flex-col items-center pt-20 h-[90vh] w-full gap-4">
            <FolderLockIcon
              className="w-32 h-32 text-slate-400"
              strokeWidth={1.2}
            />
            <p className="text-base text-slate-400">
              Login to see your watchlist
            </p>
            <Link href={"/login"}>
              <Button className="rounded-full px-6 mt-4 font-semibold text-lg">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default JioPlusWatch;

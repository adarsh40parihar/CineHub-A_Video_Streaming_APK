"use client";
import ShareButton from "@/components/atoms/ShareButton";
import CategoriesSection from "@/components/Section/CategoriesSection";
import { Button, buttonVariants } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api_endpoints";
import { Film, FolderLockIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function CinePlusWatch() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");
  const { user, isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn) {
    return (
      <div>
        <div className="px-6 pt-7 text-2xl">Cine+ Premium Videos</div>
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
    );
  }

  // check -> if you are premium or not
  if (!user.isPremium) {
    return (
      <div className="h-screen w-full flex pt-20 items-center text-white bg-black text-xl flex-col gap-6">
        <Film className="w-32 h-32 text-slate-400" strokeWidth={1.2} />
        You need premium access to watch this content.
        <Link href="/subscription" className={buttonVariants()}>
          Buy Premium
        </Link>
      </div>
    );
  }
  //show the video
  return (
    <div className="relative">
      <video
        src={API_BASE_URL + `/videos/watch/?id=${videoId}`}
        controls
        autoPlay
        className="w-screen h-[90vh]"
        // crossOrigin is needed to handle CORS for video resources from a different domain
        crossOrigin="anonymous"
      />
      <div className="absolute right-4 top-4">
        <ShareButton />
      </div>
    </div>
  );
}

export default CinePlusWatch;

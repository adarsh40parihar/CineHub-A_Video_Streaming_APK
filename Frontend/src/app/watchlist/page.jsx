"use client";
import CategoriesSection from "@/components/Section/CategoriesSection";
import { Button } from "@/components/ui/button";
import { api, ENDPOINT } from "@/lib/api_endpoints";
import { FolderLockIcon } from "lucide-react";
import Link from "next/link";
import React, {useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function WatchList() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const title = "Watchlist";
  const [watchlistData, setWatchlistData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Use useEffect to fetch data only once when component mounts
    useEffect(() => {
      const fetchData = async () => {
        if (isLoggedIn) {
          try {
            const res = await api.get(ENDPOINT.getWishlist);
            setWatchlistData(res.data.data);
          } catch (error) {
            console.error("Error fetching watchlist:", error);
          }
        }
      };
      fetchData();
    }, [isLoggedIn]);

  // Create memoized fetcher function that returns cached data
  const fetcher = useCallback(async () => {
    return watchlistData || [];
  }, [watchlistData]);

  return (
    <div>
      {isLoggedIn ? (
        <CategoriesSection
          id="wishlist"
          title={title}
          fetcher={fetcher}
        />
      ) : (
        <div>
          <div className="px-6 pt-7 text-2xl">Wishlist</div>
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

export default WatchList;

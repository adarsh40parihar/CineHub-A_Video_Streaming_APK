"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api, ENDPOINT, getWatchURL, PosterFetcher } from "@/lib/api_endpoints";
import { InboxIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FileImage } from "lucide-react";

function Seachpage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const fetchResult = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await api.get(ENDPOINT.searchResult(query));
      setData(response?.data?.data);
    } catch (err) {
      console.error("Error fetching search results:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (query && query.trim() !== "") {
      fetchResult();
    }
  }, [query]);
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin md:h-[50px] md:w-[50px] h-[35px] w-[35px] text-gray-300" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <InboxIcon
          className="w-32 h-32 text-slate-400 mb-10"
          strokeWidth={1.2}
        />
        <p className="text-lg text-gray-500">No items found.</p>
      </div>
    );
  }
  return (
    <div className="pt-8 px-6">
      <h2 id={query} className="text-2xl font-medium mb-6 scroll-m-[100px]">
        Search Result for : "{query}"
      </h2>
      {data == null || data.filter((vid) => vid?.poster_path).length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[150px] sm:h-[200px] md:h-[300px] py-12">
          <InboxIcon
            className="w-32 h-32 text-slate-400 mb-10"
            strokeWidth={1.2}
          />
          <p className="text-lg text-gray-500">No items found.</p>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-5 justify-center w-full py-4">
          {data.filter((vid) => vid?.poster_path)
            .map((vid) => (
              <Link
                href={getWatchURL(vid?.id, vid?.media_type, vid?.poster_path)}
                key={vid.id}
                className="flex-shrink-0 transform-gpu"
              >
                <Image
                  src={PosterFetcher(vid?.poster_path)}
                  width={200}
                  height={300}
                  alt={vid?.title || "Poster"}
                  className="min-w-[100px] sm:min-w-[150px] md:min-w-[200px] h-[150px] sm:h-[200px] md:h-[300px] rounded-lg bg-slate-600 hover:scale-110 transition-all duration-400 ease-in-out object-cover"
                />
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Seachpage;

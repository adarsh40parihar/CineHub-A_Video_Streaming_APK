import CategoriesSection from "@/components/Section/CategoriesSection";
import { api, ENDPOINT, getStreamingVideoThumbanial } from "@/lib/api_endpoints";
import { cn } from "@/lib/utils";
import { PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";


async function JioPlus() {
  const videos = (await api.get(ENDPOINT.fetchAllStreamingVideos)).data?.data;

    return (
      <main className="h-screen p-8">
        <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
        <ul
          className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide p-4")}
        >
          {videos?.map((video, index) => (
            <Link
              key={index}
              href={`jio+/watch?id=${video.id}`}
              className="relative flex items-center justify-center"
            >
              <Image
                src={getStreamingVideoThumbanial(video.id)}
                alt=""
                width={200}
                height={300}
                className="min-w-[200px] h-[300px] hover:scale-105 rounded-lg object-cover transition-all duration-300 ease-in-out"
                quality={30}
              />
              <PlayCircleIcon className="absolute" height={35} width={35} />
            </Link>
          ))}
        </ul>
      </main>
    );
}
export default JioPlus;

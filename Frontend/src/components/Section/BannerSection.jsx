import { getWatchURL, PosterFetcher } from "@/lib/api_endpoints";
import React, { Suspense } from 'react'
import { Skeleton } from '../ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Link from "next/link";

async function BannerSection({fetcher}) {
  return (
    <Suspense fallback={<BannerSectionFallback />}>
      <BannerSectionContent fetcher={fetcher} />
    </Suspense>
  );
}
async function BannerSectionContent({ fetcher }) {
  const data = await fetcher();
      if (!data || data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center w-full h-[150px] sm:h-[200px] md:h-[300px] py-12">
            <InboxIcon
              className="w-32 h-32 text-slate-400 mb-10"
              strokeWidth={1.2}
            />
            <p className="text-lg text-gray-500">No items found.</p>
          </div>
        );
      }
  return (
    <div>
      <Carousel
        opts={{
          align: "center",
          loop: "true",
        }}
        className="w-full md:px-0 px-4"
      >
        <CarouselContent className="">
          {data.map((vid) => (
            <CarouselItem
              className="w-full max-w-[554px] h-[312px]"
              key={vid.id}
            >
              <Link
                href={getWatchURL(vid?.id, vid?.media_type, vid?.poster_path)}
                key={vid.id}
              >
                <Image
                  src={PosterFetcher(vid?.poster_path)}
                  alt=""
                  width={700}
                  height={500}
                  className="w-full h-full bg-slate-600 rounded-lg object-cover"
                  quality={30}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-[10%] hidden md:flex gap-4">
          <CarouselPrevious className="h-[50px] w-[50px] bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 ease-in-out" />
          <CarouselNext className="h-[50px] w-[50px] bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 ease-in-out" />
        </div>
      </Carousel>
    </div>
  );
}
function BannerSectionFallback() {
  return (
    <div className="flex justify-center items-center gap-4">
      <Skeleton className="w-[554px] h-[312px] rounded-lg "></Skeleton>
      <Skeleton className="w-[554px] h-[312px] rounded-lg "></Skeleton>
      <Skeleton className="w-[554px] h-[312px] rounded-lg "></Skeleton>
    </div>
  );
}

export default BannerSection;
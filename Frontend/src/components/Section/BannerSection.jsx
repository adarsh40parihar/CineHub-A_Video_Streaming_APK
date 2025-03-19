import { getBannerData } from '@/lib/api_endpoints';
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

const ImageBaseURL = "https://image.tmdb.org/t/p/original";

async function BannerSection() {
  return <Suspense fallback={<BannerSectionFallback/>}>
    <BannerSectionContent/>
  </Suspense>;
}
async function BannerSectionContent() {
  const data = await getBannerData();
  console.log(data)
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
          {data.map((vid, i = 0) => (
            <CarouselItem
              className="w-full max-w-[554px] h-[312px]"
              key={vid.id}
            >
              
              <Image
                src={ImageBaseURL + vid?.poster_path}
                alt=""
                width={700}
                height={500}
                className="w-full h-full bg-slate-600 rounded-lg object-cover"
                quality={30}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-1 right-[12%] hidden md:flex">
          <CarouselPrevious className="h-[45px] w-[45px]" />
          <CarouselNext className="h-[45px] w-[45px]" />
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
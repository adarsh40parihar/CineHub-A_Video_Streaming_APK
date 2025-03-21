import React, { Suspense } from 'react'
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { PosterFetcher } from '@/lib/api_endpoints';
import { InboxIcon } from 'lucide-react';

async function CategoriesSection(props) {
    const { title, id } = props;
  return (
      <div className="pt-8 px-6">
        <h2 id={id} className="text-2xl font-medium mb-6 scroll-m-[100px]">
          {title}
        </h2>
        <Suspense fallback={<CategoriesSectionFallback />}>
          <CategoriesSectionContent {...props} />
        </Suspense>
      </div>
  );
}

async function CategoriesSectionContent(props) {
  const { fetcher, title } = props;
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
    <ul className="flex gap-4 w-full overflow-scroll scrollbar-hide ">
      {data.map((vid) => (
        <Image
          key={vid.id}
          src={PosterFetcher(vid?.poster_path)}
          width={200}
          height={300}
          alt=""
          className="min-w-[100px] sm:min-w-[150px] md:min-w-[200px] h-[150px] sm:h-[200px] md:h-[300px] rounded-lg bg-slate-600"
        ></Image>
      ))}
    </ul>
  );
}

function CategoriesSectionFallback() {

  return (
      <ul className="flex gap-4 w-full overflow-scroll scrollbar-hide ">
        {new Array(12).fill(0).map((e, idx) => (
          <Skeleton key={idx} className="min-w-[200px] h-[300px]" />
        ))}
      </ul>
  );
}

export default CategoriesSection;
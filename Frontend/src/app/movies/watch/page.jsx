import { Button } from '@/components/ui/button';
import { api, ENDPOINT } from '@/lib/api_endpoints';
import { FileVideo } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const MoviesWatch = async ({searchParams: {id}}) =>{
  const details = (await api.get(ENDPOINT.getMovieDetails(id))).data.data.results?.[0];
  return (
    <div>
      {details ? (
        <div>
          <iframe
            className="w-full lg:h-[78vh] aspect-video"
            src={`https://www.youtube.com/embed/${details.key}`}
            allowFullScreen
          />
          <div className="flex flex-wrap gap-4 px-4 lg:px-10 py-8 items-center">
            <h1 className="text-2xl font-bold">{details.name}</h1>
          </div>
        </div>
      ) : (
        <div className="w-full h-[70vh] flex flex-col gap-5 justify-center items-center text-slate-400">
          <FileVideo className="h-[120px] w-[120px]" />
          <p>Uh Oh! Video is unavailable.</p>
          <Link href="/">
            <Button>Take me to Home</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MoviesWatch;
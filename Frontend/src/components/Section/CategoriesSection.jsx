import React from 'react'
import { Skeleton } from '../ui/skeleton';

function CategoriesSection(props) {
  const { title, id } = props;
  return (
    <div className="py-8 px-6">
      <h2 id={id} className="text-2xl font-medium mb-6 scroll-m-[100px]"> 
        {title}
      </h2>
      <ul className='flex gap-4 w-full overflow-scroll '>
        {new Array(12).fill(0).map((e, idx) => (
          <Skeleton key={idx} className="min-w-[200px] h-[300px] bg-red-100" />
        ))}
      </ul>
    </div>
  );
}

export default CategoriesSection
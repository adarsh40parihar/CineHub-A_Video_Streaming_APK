import React from 'react'
import Link from 'next/link';

function JumperSection(props) {
  const { list } = props;
  return (
    <div className="p-6 flex gap-4 mt-[64px] ">
      {list.map((item) => (
        <Link
          key={item.href}
          className="px-3 py-2 rounded-full text-white bg-black  text-sm over-scroll font-bold scrollbar-hide" //bg-white/15  real bg
          href={`#${item.href}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default JumperSection;
import { Category } from '@/types';
import Image from 'next/image';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="bg-white px-[20px] py-[40px] rounded-[10px] w-[300px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-[5px] cursor-pointer group text-center">
      <div className="w-[50px] h-[50px] mx-auto mb-[20px] relative">
        <Image
          src={category.iconPath}
          alt={`${category.title} Icon`}
          fill
          className="object-contain"
        />
      </div>

      <h4 className="text-[18px] text-[#333333] mb-[5px] font-serif">{category.title}</h4>
      <p className="text-[12px] text-[#64748b] mb-[15px]">{category.description}</p>

      <p className="text-[16px] font-bold text-[#1b3252]">
        {category.count} <span className="text-[12px] font-normal text-[#94a3b8]">arsip</span>
      </p>
    </div>
  );
}

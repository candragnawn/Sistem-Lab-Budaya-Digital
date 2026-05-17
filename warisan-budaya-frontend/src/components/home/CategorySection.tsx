import { Category } from '@/types';
import { CategoryCard } from '../ui/CategoryCard';

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="px-[50px] py-[60px] text-center">
      <div className="mb-[40px]">
        <h5 className="text-[#ceaa56] text-[12px] tracking-[2px] uppercase mb-[10px] font-medium">KATEGORI KOLEKSI</h5>
        <h3 className="text-[#1b3252] text-[28px] font-serif">Jelajahi Berdasarkan Jenis Arsip</h3>
      </div>

      <div className="flex justify-center gap-[30px] flex-wrap">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

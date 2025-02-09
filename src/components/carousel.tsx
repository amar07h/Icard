import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import { GetCarsoul } from '@/lib/server/get';
import type {Carsoul}from "@/lib/type/carsoul"
export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const product =await GetCarsoul();
  const products :Carsoul =product?.body
  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product) => (
          <li
            key={Math.random()}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`${product.path}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.price,
                  currencyCode:'tnd'
                }}
                src={product.img}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from 'next/link';
import {FC} from "react"
import { GridTileImage } from './grid/tile';
import type {CarsoulType}from "@/lib/type/product"
interface ChildProps {
  product: CarsoulType;
  ComponentName:string;
  ComponentPath:string;
}
export const Carousel: FC<ChildProps> = ({ product,ComponentName,ComponentPath }) => {
  const products :CarsoulType =product
  if (!products?.length) return null;
  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <div className='flex justify-between text-3xl capitalize mb-3  mt-2'>
      <h3 className='ml-6'>{ComponentName}</h3>
      <Link href={`${ComponentPath}`}>
<h3 className='mr-6 cursor-pointer border-b-2 hover:text-gray-400'>plus</h3>
</Link>
      </div>
         

      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product) => (
          <li
            key={Math.random()}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.path}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                }}
                src={product.featuredImage.url}
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

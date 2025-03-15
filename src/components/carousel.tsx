import Link from 'next/link';
import { FC, Fragment } from 'react';
import { GridTileImage } from './grid/tile';
import type { CarouselData, CarsoulType } from '@/lib/type/product';

export const Carousel: FC<CarouselData> = ({ product, ComponentName, ComponentPath }) => {
  const products: CarsoulType = product;
  if (!products?.length) return null;
  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products];

  return (
    <Fragment>
      <div className="mb-3 mt-2 flex justify-between text-lg capitalize">
        <h3 className="ml-4 py-3 text-lg font-extrabold">{ComponentName}</h3>
        <Link href={`${ComponentPath}`}>
          <h3 className="mr-4 cursor-pointer border-b-2 py-3 hover:text-gray-400">plus</h3>
        </Link>
      </div>
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <ul className="flex animate-carousel gap-4">
          {carouselProducts.map((product) => (
            <li
              key={Math.random()}
              className="relative aspect-square h-[30vh] max-h-[275px] w-2/6 max-w-[475px] flex-none md:w-1/6"
            >
              <Link href={`/product/${product.path}`} className="relative h-full w-full">
                <GridTileImage
                  alt={product.name}
                  label={{
                    title: product.name
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
    </Fragment>
  );
};

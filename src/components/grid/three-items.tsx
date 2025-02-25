"use client";
import { usePathname } from "next/navigation";

import { GridTileImage } from '@/components/grid/tile';
import type { CarsoulType, Offre } from '@/lib/type/product';
import { GetOffre,GetCarsoul } from '@/lib/server/get';
import Link from 'next/link';
import { Fragment } from "react";
function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Offre;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.path}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name as string,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  //todo make this with real data 
  const homepage:CarsoulType = await GetOffre();
  const homepageItems=homepage
  if (!homepageItems || !homepageItems || !homepageItems) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-7xl gap-4 px-4 pb-4 mt-3 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
export async function FourItemGrid() {
  const pathname = usePathname();  
  console.log(pathname)

  const data = await GetCarsoul(pathname);
  const products :CarsoulType =data.result

  return (
    <Fragment>         
       <div className="text-7xl text-red-500 text-center "> header </div>       
    <section className="mx-auto mt-12 grid max-w-screen-2xl gap-4 px-4 pb-4 lg:mt-3 md:grid-cols-8 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">

      {products.map((i)=>(
      <ThreeItemGridItem key={i.id} size="half" item={i} priority={true} />
    ))}
    </section>
    </Fragment>

  );
}

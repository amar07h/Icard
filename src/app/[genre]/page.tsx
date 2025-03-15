'use server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { FourItemGrid } from '@/components/grid/three-items';
import { GetCarsoul } from '@/lib/server/get';
import type { CarsoulType } from '@/lib/type/product';
export async function generateMetadata(props: {
  params: Promise<{ genre: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await GetCarsoul(params.genre);
  const products: CarsoulType = product.result;

  if (!products) return notFound();

  const { url, width, height, altText: alt } = products[0].featuredImage;
  const indexable = !products[0].name;

  return {
    title: products[0].name,
    description: products[0].path,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}
export default async function page(props: { params: Promise<{ genre: string }> }) {
  const params = await props.params;

  const product = await GetCarsoul(params.genre);
  const products: CarsoulType = product.result;
  if (!products) return notFound();
  return (
    <Fragment>
      <FourItemGrid
        product={products}
        ComponentName={`Contactez-nous si vous ne trouvez pas ce que vous cherchez`}
      />
    </Fragment>
  );
}

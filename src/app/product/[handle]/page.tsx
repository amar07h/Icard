import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GridTileImage } from '@/components/grid/tile';
import Footer from '@/components/layouts/footer';
import { Gallery } from '@/components/product/gallery';
import { ProductProvider } from '@/components/product/product-context';
import { ProductDescription } from '@/components/product/product-description';
import {GetSinglData } from '@/lib/server/get';

import { Image } from '@/lib/type';
import Link from 'next/link';
import { Suspense } from 'react';

 export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await GetSinglData(params.handle);
/*   async function product(id:string) {
    return products.find((product) => product.id === id);
  } */
  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.title || {};
  const indexable = !product.tags.includes('z');

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
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

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await GetSinglData(params.handle);
  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      highPrice: product.priceRange.maxVariantPrice||"200",
      lowPrice: product.priceRange.minVariantPrice||"100"
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
               <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              /> 
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
{/*        <RelatedProducts id={product.id} />
 */}       </div>
      <Footer />
    </ProductProvider>
  );
}

 async function RelatedProducts({ id }: { id: string }) {
  //const relatedProducts = await getProductRecommendations(id);
  const relatedProducts=[{
    "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
    "title": "New Short Sleeve T-Shirt",
    "price": { "value": 25, "currencyCode": "USD" },
    "featuredImage":"/assets/t-shirt-circles-blue.png",
    "availableForSale":true,
    "priceRange":{
     "minVariantPrice":{"currencyCode":"TND","amount":"14"},
     "maxVariantPrice":{"amount":"200"}
    },
    "description": "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
    "descriptionHtml": "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    
  },
  {
    "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
    "title": "New Short Sleeve T-Shirt",
    "price": { "value": 25, "currencyCode": "USD" },
    "featuredImage":"/assets/t-shirt-circles-blue.png",
    "availableForSale":true,
    "priceRange":{
     "minVariantPrice":{"currencyCode":"TND","amount":"14"},
     "maxVariantPrice":{"amount":"200"}
    },
    "description": "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
    "descriptionHtml": "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    
  },
  {
    "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
    "title": "New Short Sleeve T-Shirt",
    "price": { "value": 25, "currencyCode": "USD" },
    "featuredImage":"/assets/t-shirt-circles-blue.png",
    "availableForSale":true,
    "priceRange":{
     "minVariantPrice":{"currencyCode":"TND","amount":"14"},
     "maxVariantPrice":{"amount":"200"}
    },
    "description": "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
    "descriptionHtml": "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    
  },
  {
    "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
    "title": "New Short Sleeve T-Shirt",
    "price": { "value": 25, "currencyCode": "USD" },
    "featuredImage":"/assets/t-shirt-circles-blue.png",
    "availableForSale":true,
    "priceRange":{
     "minVariantPrice":{"currencyCode":"TND","amount":"14"},
     "maxVariantPrice":{"amount":"200"}
    },
    "description": "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
    "descriptionHtml": "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    
  },
  {
    "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
    "title": "New Short Sleeve T-Shirt",
    "price": { "value": 25, "currencyCode": "USD" },
    "featuredImage":"/assets/t-shirt-circles-blue.png",
    "availableForSale":true,
    "priceRange":{
     "minVariantPrice":{"currencyCode":"TND","amount":"14"},
     "maxVariantPrice":{"amount":"200"}
    },
    "description": "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
    "descriptionHtml": "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    
  }]


 // if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
          //todo make this with product id or title
            key={Math.random()}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.title}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
             /*      amount: product.priceRange.maxVariantPrice,
                  currencyCode: product.priceRange.minVariantPrice.currencyCode */
                }}
                src={product.featuredImage}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 

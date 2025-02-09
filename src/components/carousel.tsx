import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = [
    {
      id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
      name: "New Short Sleeve T-Shirt",
      vendor: "Next.js",
      path: "/new-short-sleeve-t-shirt",
      img:"/assets/cup-white.png",
      slug: "new-short-sleeve-t-shirt",
      price: { value: "25" , currencyCode: "USD" },
      description: "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
     descriptionHtml: "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
   
    },
    {
      id: "Z2lkOi8vc2hvcGlmeS9Qcm9ksdWN0LzU0NDczMjUwMjQ0MjA=",
      name: "Lightweight Jacket",
      vendor: "Next.js",
      path: "/lightweight-jacket",
      slug: "lightweight-jacket",
      img:"/assets/shoes-1.png",
      price: { value: "249.99", currencyCode: "USD" },
      description: "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
     descriptionHtml: "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    },
    {
      id: "Z2lkOis8vc2hvcGlmsddeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
      name: "Shirt",
      vendor: "Next.js",
      path: "/shirt",
      slug: "shirt",
      img:"/assets/baby-cap-white.png",
      price: { value: "25", currencyCode: "USD" },
      description: "Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last - only 200 of these shirts will be made! All proceeds will be donated to charity.",
     descriptionHtml: "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    }
  ]

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
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.value,
                  currencyCode: product.price.currencyCode
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

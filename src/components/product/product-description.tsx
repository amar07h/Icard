'use client';
import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { Product } from '@/lib/type/product';
import { VariantSelector } from './variant-selector';
import { useState } from 'react';
export function ProductDescription({ product }: { product: Product }) {
  //?handel the price base on selector
  const [prix, SetPrix] = useState<string>('2');
  const handlePriceByVarientSelector = (childValue: string) => {
    const result = product.variants.find((i) => i.title === childValue);
    if (result) {
      SetPrix(result.price);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={prix} currencyCode={'TND'} />
        </div>
      </div>
      <VariantSelector
        options={product.options}
        variants={product.variants}
        sendDataToParent={handlePriceByVarientSelector}
      />
      <AddToCart product={product} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}

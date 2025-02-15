import {Connection} from "./http"
export type Product = Omit<OwnProduct, 'variants' | 'images'> & {
    variants: ProductVariant[];
    images: Image[];
  };
  export type ProductOption = {
    id: string;
    name: string;
    values: string[];
  };
export type OwnProduct = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: string;
    variants: ProductVariant;
    featuredImage: Image;
    images: Connection<Image>;
    seo: SEO;
    tags: string[];
    updatedAt: string;
  };
export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    price: string;
  };
export type SEO = {
    title: string;
    description: string;
  };
export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
  };

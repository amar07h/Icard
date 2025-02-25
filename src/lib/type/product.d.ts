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
    priceRange: {
      maxVariantPrice: string;
      minVariantPrice: string;
    };
    variants: ProductVariant;
    featuredImage: Image;
    images: Image;
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

  export type Offre={
    id:string,
    name:string,
    path:string,
    featuredImage:Image
  }
  export type CarsoulType = Offre[]
  export interface CarouselData {
    product: CarsoulType;
    ComponentName:string;
    ComponentPath:string;
  }
import type { Metadata } from "next";
import { ThreeItemGrid } from '@/components/grid/three-items';
import { Carousel } from '@/components/carousel';
import Footer from '@/components/layouts/footer';
import type {CarsoulType} from "@/lib/type/product"
import { GetCarsoul,GetOffre } from '@/lib/server/get';
import { Slider } from "@/components/coursel/slider";
export const metadata:Metadata = {
  //TODO : add description to home page 
  description: 'pizza.',
  openGraph: {
    type: 'website'
  }
};
export default async function Home() {
  const product =await GetCarsoul();
    const homepage = await GetOffre();
  
  const products :CarsoulType =product.result
  const offre :CarsoulType =homepage
  const products2 :CarsoulType =product.result2
  return (
    <>          

          <Slider product={offre} ComponentPath="/game"/>
           <Carousel product={products}  ComponentName="gameo" ComponentPath="/game" />
           <ThreeItemGrid />
           <Carousel product={products2} ComponentName="trend" ComponentPath="/card"/>

          <Footer />
    </>
  );
}

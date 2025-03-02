import type { Metadata } from "next";
import { ThreeItemGrid } from '@/components/grid/three-items';
import { Carousel } from '@/components/carousel';
import type {CarsoulType} from "@/lib/type/product"
import { GetCarsoul,GetOffre } from '@/lib/server/get';
import { Slider } from "@/components/coursel/slider";
import { Fragment } from "react";
export const metadata:Metadata = {
  //TODO : add descriptnpm rion to home page 
  description: 'pizza.',
  title:"gaming store ",
  openGraph: {
    type: 'website'
  }
};

export default async function Home() {
  const product =await GetCarsoul("all");
    const homepage = await GetOffre();
  
  const products :CarsoulType =product.result
  const offre :CarsoulType =homepage
  const products2 :CarsoulType =product.result2
  return (
    <Fragment>          

          <Slider product={offre} ComponentPath="/games"/>
           <Carousel product={products}  ComponentName="Cartes cadeaux Jeux" ComponentPath="/games" />
           <div className="lg:block hidden">
           <ThreeItemGrid />
           </div>
           <Carousel product={products2} ComponentName="trend" ComponentPath="/card"/>

    </Fragment>
  );
}

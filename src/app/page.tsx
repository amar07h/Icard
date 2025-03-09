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
  
  const games :CarsoulType =product.games.slice(1)
  const offre :CarsoulType =homepage
  const streaming :CarsoulType =product.console.slice(1)
  return (
    <Fragment>          

          <Slider product={offre} ComponentPath="/games"/>
           <Carousel product={games}  ComponentName="Cartes cadeaux Jeux" ComponentPath="/games" />
           <div className="lg:block hidden">
           <ThreeItemGrid />
           </div>
           <Carousel product={streaming} ComponentName="streaming" ComponentPath="/console"/>

    </Fragment>
  );
}

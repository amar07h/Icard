"use client" 
import {FC} from "react"
import EmblaCarousel from './EmblaCarousel'
import './embla.css'
import Header from "@/components/coursel/Header"
import { EmblaOptionsType } from 'embla-carousel'
import type {CarsoulType}from "@/lib/type/product"
interface ChildProps {
  product: CarsoulType;
  ComponentPath:string;
}
const OPTIONS: EmblaOptionsType = { loop: true }
export const Slider: FC<ChildProps> = ({ product }) =>{
  return (
      <div className='mt-5 w-full mx-auto'>
            <Header />

        <EmblaCarousel slides={product} options={OPTIONS} />
     
    </div>      
  );
}


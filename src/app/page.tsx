import type { Metadata } from "next";
import { ThreeItemGrid } from '@/components/grid/three-items';
import { Carousel } from '@/components/carousel';
import Footer from '@/components/layouts/footer';

export const metadata:Metadata = {
  //TODO : add description to home page 
  description: 'pizza.',
  openGraph: {
    type: 'website'
  }
};
export default function Home() {
  return (
    <>
          <ThreeItemGrid />
<Carousel/>
      <Footer />
    </> 
  );
}
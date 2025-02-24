import { Fragment } from 'react'
import { FourItemGrid } from '@/components/grid/three-items';
import Footer from '@/components/layouts/footer';

export default function page() {
  return (
    <Fragment>           
        <FourItemGrid />
        <Footer/>
    </Fragment>
  )
}

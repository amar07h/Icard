"use client" 
import Image from 'next/image';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { LockClosedIcon,ShoppingCartIcon } from '@heroicons/react/20/solid'
import { useCart } from '@/components/cart/cart-context';
import Price from '@/components/price';
import { DeleteItemButton } from '@/components/cart/delete-item-button';
import {VerifyCoupon } from '@/lib/server/get';
import { useState } from 'react';
import Link from 'next/link';

const subtotal = 'TND210.00'
type discount = { code: string, amount: string }
const taxes = '23.68'
const livraison = '22.00'

export default function Checkout() {
  const { cart,updateCartItem } = useCart();
  const [coupon,SetCoupon ] = useState<string>("");
  const [discount,Setdiscount ] = useState<discount>({code:"", amount:'0' });

async function HandelCoupon($coupon:string){
  const trim = $coupon.replaceAll(' ', '');
  console.log(cart)
  if(trim!==""){
try {
 const checked:discount=await VerifyCoupon(trim)
 Setdiscount(checked)
} catch (error) {
  console.log(error)
}
}
}
  return (
    <>
      <main className="lg:flex lg:flex-row-reverse lg:overflow-hidden max-h-screen bg-white">
        <div className="px-4 py-6 sm:px-6 lg:hidden">
          <div className="flex justify-center">
              <span className="sr-only">Gaming Store</span>
              <Image
                alt=""
                src="/logo.webp"
                className="size-52"
                height={500} width={500}
              />
          </div>
        </div>

        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section aria-labelledby="order-heading" className="max-w-7xl px-4 py-6 sm:px-6 lg:hidden bg-white">
          <Disclosure as="div" className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <h2 id="order-heading" className="text-lg font-medium text-gray-900">
                Your Order
              </h2>
              <DisclosureButton className="group font-medium text-indigo-600 hover:text-indigo-500">
                <span className="[.group:not([data-open])_&]:hidden">Hide full summary</span>
                <span className="group-data-[open]:hidden">Show full summary</span>
              </DisclosureButton>
            </div>

            <DisclosurePanel>
            {!cart || cart.lines.length === 0 ? (
                
                <div className="mt-20 flex w-full flex-col items-center justify-center text-gray-700 overflow-hidden">
               
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                  
                </div>
              ) : (
                
              <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
               {cart?.lines
                                .sort((a, b) =>
                                  a.merchandise.product.title.localeCompare(b.merchandise.product.title)
                                )
                                .map((item, i) => {   
                                  return(
                                  <li key={i} className="flex space-x-6 py-6">
                                  <Image height={400} width={400}
                                    alt={item.merchandise.product.featuredImage.altText ||
                                    item.merchandise.product.title}
                                    src={item.merchandise.product.featuredImage.url}
                                    className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                                  />
                                  <div className="flex flex-col justify-between space-y-4">
                                    <div className="space-y-1 text-sm font-medium">
                                    <h3 className="text-gray-900 text-lg">{item.merchandise.product.title}</h3>
                                    <h3 className="text-gray-700 text-sm">{item.merchandise.title} coins</h3>                                      <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                /> 
  
                                    </div>
                                    <div className="flex space-x-4">
                                    
                                      <div className="flex border-l border-gray-300 pl-4">
                              <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                                          
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                )
              } 
                )}
              </ul>
)}
              <form className="mt-10">
                <label htmlFor="discount-code-mobile" className="block text-sm font-medium text-gray-700">
                  Discount code
                </label>
                <div className="mt-1 flex space-x-4">
                  <input
                    id="discount-code-mobile"
                    name="discount-code-mobile"
                    type="text"
                    onChange={(e)=>SetCoupon(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button" onClick={()=>HandelCoupon(coupon)}
                    className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Apply
                  </button>
                </div>
              </form>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">{subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex">
                    Coupon
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    {discount.code==""?null:discount.code}
                    </span>
                  </dt>
                  <dd className="text-gray-900">-{discount.amount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>TVA</dt>
                  <dd className="text-gray-900">{taxes}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>livraison</dt>
                  <dd className="text-gray-900">{livraison}</dd>
                </div>
              </dl>
            </DisclosurePanel>

            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
              <span className="text-base">Total</span>
              <Price
                    className="text-right text-base text-gray-700"
                    amount={cart?.cost.totalAmount.amount||"0"}
                    currencyCode={cart?.cost.totalAmount.currencyCode||"TND"}
                      />
            </div>
          </Disclosure>
        </section>

        {/* Order summary */}
        <section aria-labelledby="summary-heading" className="hidden w-full max-w-md h-screen flex-col lg:flex">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul role="list" className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6 bg-white">
           {cart?.lines
                                .sort((a, b) =>
                                  a.merchandise.product.title.localeCompare(b.merchandise.product.title)
                                )
                                .map((item, i) => {          
                                  return (
                                     <li key={i} className="flex space-x-6 py-6">
                                    <Image
                                    width={400}
                                    height={400}
                                      alt={item.merchandise.product.featuredImage.altText ||
                                      item.merchandise.product.title}
                                      
                                      src={item.merchandise.product.featuredImage.url}
                                      className="h-40 w-40 flex-none rounded-md  object-cover object-center"
                                    />
                                    <div className="flex flex-col justify-between space-y-4">
                                      <div className="space-y-1 text-sm font-medium">
                                        <h3 className="text-gray-900 text-xl">{item.merchandise.product.title}</h3>
                                        <h3 className="text-gray-700 text-lg">{item.merchandise.title} coins</h3>
                                        <Price
                                  className="flex justify-end space-y-2 text-gray-900 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                /> 
                                      </div>
                                      <div className="flex space-x-4">
                                        
                                        <div className="flex border-l border-gray-300 pl-4">
                                          <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                                        </div>
                                      </div>
                                    </div>
                                  </li> );
                                })}

           
          </ul>

          <div className="sticky bottom-0 flex-none border-t border-gray-200 p-6">
            <form>
              <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700">
                Discount code
              </label>
              <div className="mt-1 flex space-x-4">
                <input
                  id="discount-code"
                  name="discount-code"
                  type="text"               
                  onChange={(e)=>SetCoupon(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button" onClick={()=>HandelCoupon(coupon)}
                  className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Apply
                </button>
              </div>
            </form>

            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">{subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    {discount.code==""?null:discount.code}
                  </span>
                </dt>
                <dd className="text-gray-900">-{discount.amount}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">{taxes}</dd>
              </div>
              <div className="flex justify-between">
                <dt>livraison</dt>
                <dd className="text-gray-900">{livraison}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{cart?.cost.totalAmount.amount||"0"} TND</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 bg-white sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto max-w-lg">
            <div className="hidden pb-16 pt-2 lg:flex justify-center">
                <h3 className="sr-only">Gaming Store </h3>
                <Image
                alt=""
                src="/logo.webp"
                className="size-52"
                height={500} width={500}
              />
            </div>

            <form className="mt-6 ">
              <div className="grid grid-cols-12 gap-x-4 gap-y-6 text-gray-700">
              <div className="col-span-full">
                  <label htmlFor="Nom-et-Prenom" className="block text-sm font-medium">
                   Nom et Prenom
                  </label>
                  <div className="mt-1">
                    <input
                      id="Nom-et-Prenom"
                      name="Nom-et-Prenom"
                      type="text"
                      autoComplete="cc-name"
                      className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="email-address" className="block text-sm font-medium">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email-address"
                      name="email-address"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="whatsapp-number" className="block text-sm font-medium text-gray-700">
                    Whatsapp
                  </label>
                  <div className="mt-1">
                    <input
                      id="whatsapp-number"
                      name="whatsapp-number"
                      type="text"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>


              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Pay {cart?.cost.totalAmount.amount||"0"} TND
              </button>

              <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
                <LockClosedIcon aria-hidden="true" className="mr-1.5 h-5 w-5 text-gray-400" />
                Payment details 
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

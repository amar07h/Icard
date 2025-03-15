'use client';
import { Fragment, useEffect, useState,FormEvent,useActionState } from 'react';
import Image from 'next/image';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { LockClosedIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useCart } from '@/components/cart/cart-context';
import Price from '@/components/price';
import { EditItemQuantityButton } from '@/components/cart/edit-item-quantity-button';
import {VerifyCoupon } from '@/lib/server/get';
import { sendMail } from "@/lib/send-mail";

type discount = { code: string; amount: number };
const livraison = 'blech';

export default function Checkout() { 
  const { cart, updateCartItem } = useCart();
  const total: string = cart?.cost.totalAmount.amount || '0.0';
  const [state, Send, isPending] = useActionState(sendEmail, null);
  const [Fintotal, SetFintotal] = useState<number>(0);
  const [coupon, SetCoupon] = useState<string>('');
  const [couponError, SetCouponError] = useState<string>('');
  const [discount, Setdiscount] = useState<number>(0);
  async function HandelCoupon($coupon: string) {
    const trim = $coupon.replaceAll(' ', '');
    if (trim !== '') {
      try {
        const checked: discount = await VerifyCoupon(trim);
        if(checked.code==="404"){
          SetCouponError("invalid coupon or expire")
          Setdiscount(0)
        }
        else{
          const isTrue:number = checked.amount;
        if (isTrue) {
          const totalInt=parseFloat(total)
          let calculted:number=totalInt/100;
          const finalCalculted:number=calculted*isTrue;
        Setdiscount(finalCalculted)
          const FinatTotal=totalInt-finalCalculted;
          SetFintotal(FinatTotal);
        }
        }
        
      } catch (error) {
        Setdiscount(0)
      }
    }
  }
  useEffect(() => {
    if(discount>=0){
      HandelCoupon(coupon)
    }
  }, [total]);
  useEffect(() => {
    const  subtotal: number = parseFloat(total);
    SetFintotal(subtotal)
  }, [total]);
   
  async function sendEmail(prevState: any,formData: FormData) {
    const keys = ["name", "email", "whatsapp"];
    const values = keys.map(key => formData.get(key));
    const [name, email, whatsapp] = values;
   const comand:string[]| undefined = cart?.lines.map((i) => i.merchandise.product.title);
   const Qte:string[]| undefined = cart?.lines.map((i) => i.merchandise.title);
   const SelectVarientRegion:string[]| undefined = cart?.lines.map((i) => i.merchandise.selectedOptions[0].name);
   const SelectVarientValue:string[]| undefined = cart?.lines.map((i) => i.merchandise.selectedOptions[0].value);
       const response = await sendMail({
            email: " values.email",
            subject: `un autre command avec un prix ${Fintotal}`,
            text: "data.test text",
            html: `
            <h1>client Name </h1>
            <h1>${name}</h1>
            <h1>client email </h1>
            <h1>${email}</h1>
             <h1>numero client </h1>
            <h1>${whatsapp}</h1>
            <h1>couponValue </h1>
            <h1>${discount}</h1>
             <h1>couponName  </h1>
            <h1>${coupon}</h1>
         <h1>Detail de Commande</h1>
         <h1> Commande name</h1>
        <h1>${comand}</h1>
         <h1> Quantity</h1>
        <h1>${Qte}</h1>
            <h1> Varient Option region</h1>
                    <h1>${SelectVarientRegion}</h1>
            <h2> Varient Option value </h2>
                    <h1>${SelectVarientValue}</h1>
            <h1>Net a paye </h1>
            <h1>${Fintotal}</h1>
            `,
          });
          if (response?.messageId) {
            console.log("email  send to application.");
          } else {
            console.log("Failed To send application.");
          }
          console.log("Form submitted with data:");
      
  }
  return (
    <Fragment>
      <main className="max-h-screen bg-white lg:flex lg:flex-row-reverse lg:overflow-hidden">
        <div className="px-4 py-6 sm:px-6 lg:hidden">
          <div className="flex justify-center">
            <span className="sr-only">Gaming Store</span>
            <Image alt="" src="/logo.webp" className="size-52" height={500} width={500} />
          </div>
        </div>

        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby="order-heading"
          className="max-w-7xl bg-white px-4 py-6 sm:px-6 lg:hidden"
        >
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
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden text-gray-700">
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
                      return (
                        <li key={i} className="flex space-x-6 py-6">
                          <Image
                            height={400}
                            width={400}
                            alt={
                              item.merchandise.product.featuredImage.altText ||
                              item.merchandise.product.title
                            }
                            src={item.merchandise.product.featuredImage.url}
                            className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                          />
                          <div className="flex flex-col justify-between space-y-4">
                            <div className="space-y-1 text-sm font-medium">
                              <h3 className="text-lg text-gray-900">
                                {item.merchandise.product.title}
                              </h3>
                              <h3 className="text-sm text-gray-700">
                                {item.merchandise.title} coins
                              </h3>{' '}
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={item.cost.totalAmount.currencyCode}
                              />
                            </div>
                            <div className="flex space-x-4">
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                  optimisticUpdate={updateCartItem}
                                />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm text-gray-700">
                                    {item.quantity}
                                  </span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
              <form className="mt-10">
                <label
                  htmlFor="discount-code-mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount code
                </label>
                <div className="mt-1 flex space-x-4">
                  <input
                    id="discount-code-mobile"
                    name="discount-code-mobile"
                    type="text"
                    onChange={(e) => SetCoupon(e.target.value)}
                    className="block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => HandelCoupon(coupon)}
                    className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Apply
                  </button>
                </div>
              </form>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">
                    {typeof Fintotal === 'number' ? Fintotal.toFixed(3) : 'N/A'}DT{' '}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex">
                    Coupon
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                      {discount == 0 ? null :coupon}
                    </span>
                  </dt>
                  <dd className="text-gray-900">-{discount}</dd>
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
                amount={Fintotal.toString()}
                currencyCode={cart?.cost.totalAmount.currencyCode || 'TND'}
              />
            </div>
          </Disclosure>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden h-screen w-full max-w-md flex-col lg:flex"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul
            role="list"
            className="flex-auto divide-y divide-gray-200 overflow-y-auto bg-white px-6"
          >
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
                      alt={
                        item.merchandise.product.featuredImage.altText ||
                        item.merchandise.product.title
                      }
                      src={item.merchandise.product.featuredImage.url}
                      className="h-40 w-40 flex-none rounded-md object-cover object-center"
                    />
                    <div className="flex flex-col justify-between space-y-4">
                      <div className="space-y-1 text-sm font-medium">
                        <h3 className="text-xl text-gray-900">{item.merchandise.product.title}</h3>
                        <h3 className="text-lg text-gray-700">{item.merchandise.title} coins</h3>
                        <Price
                          className="flex justify-end space-y-2 text-right text-sm text-gray-900"
                          amount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                        />
                      </div>
                      <div className="flex space-x-4">
                        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <EditItemQuantityButton
                            item={item}
                            type="minus"
                            optimisticUpdate={updateCartItem}
                          />
                          <p className="w-6 text-center">
                            <span className="w-full text-sm text-gray-700">{item.quantity}</span>
                          </p>
                          <EditItemQuantityButton
                            item={item}
                            type="plus"
                            optimisticUpdate={updateCartItem}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
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
                  onChange={(e) => SetCoupon(e.target.value)}
                  className="block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => HandelCoupon(coupon)}
                  className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Apply
                </button>
              </div>
              <p className='text-base text-red-600 text-center mt-3'>{couponError}</p>

            </form>

            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">
                  {typeof total === 'string' ? parseFloat(total).toFixed(3): 'N/A'}DT
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    {discount == 0 ? null : coupon}
                  </span>
                </dt>
                <dd className="text-gray-900">-{typeof discount === 'number' ? discount.toFixed(3) : 'N/A'}DT
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>livraison</dt>
                <dd className="text-gray-900">{livraison}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">
                  {typeof Fintotal === 'number' ? Fintotal.toFixed(3) : 'N/A'}DT
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="max-w-7xl flex-auto overflow-y-auto bg-white px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto max-w-lg">
            <div className="hidden justify-center pb-16 pt-2 lg:flex">
              <h3 className="sr-only">Gaming Store </h3>
              <Image alt="" src="/logo.webp" className="size-52" height={500} width={500} />
            </div>

            <form className="mt-6" action={Send}>
              <div className="grid grid-cols-12 gap-x-4 gap-y-6 text-gray-700">
                <div className="col-span-full">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nom et Prenom
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="whatsapp-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Whatsapp
                  </label>
                  <div className="mt-1">
                    <input
                      id="whatsapp-number"
                      name="whatsapp"
                      type="text"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit" disabled={isPending}
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isPending ? "wait ... " : `Pay ${Fintotal.toFixed(3)} DT`}

              </button>

              <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
                <LockClosedIcon aria-hidden="true" className="mr-1.5 h-5 w-5 text-gray-400" />
                Payment details
              </p>
            </form>
            <p className="mt-5 text-lg text-gray-700">
              <span className="text-red-600">*</span>Le voucher sera envoyé par e-mail et WhatsApp.{' '}
            </p>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

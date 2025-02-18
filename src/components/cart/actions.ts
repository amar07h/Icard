'use server';

//import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';




export async function redirectToCheckout() {

}

export async function createCartAndSetCookie() {
  //let cart = await createCart();
   const CartItem = {
    id: "CartItem/001",  // This can be any unique ID
    quantity: 1,
    cost: {
      totalAmount: {
        amount: "8",  // Based on the variant price
        currencyCode: "TND"
      }
    },
    merchandise: {
      id: "ProductVariant/102", // This MUST match variant.id
      title: "210",  // Matches the variant title
      selectedOptions: [
        { name: "Server", value: "global" },
        { name: "Qte", value: "210" }
      ],
      product: {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
        handle: "free-fire",
        title: "Free Fire Recharge diamond",
        featuredImage: {
          url: "/assets/carsoul/freefire.jpg",
          altText: "recharge dimaond free fire",
          width: 1000,
          height: 1000
        }
      }
    }
  };
  (await cookies()).set('cartId', CartItem.id!);
}
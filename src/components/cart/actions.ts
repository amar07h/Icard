'use server';

//import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  let cartId = (await cookies()).get('cartId')?.value;

  if (!cartId || !selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
  //  await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
   // revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  
}

export async function redirectToCheckout() {

}

export async function createCartAndSetCookie() {
  //let cart = await createCart();
   const CartItem = {
    id: "1",
    quantity: 1,
    cost: {
      totalAmount:  {
        amount: "1",
        currencyCode: "tnd",
      },
    },
    merchandise: {
      id: "123",
      title: "string",
      selectedOptions: {
        name : "string",
        value : "string",
      },
      product: {
        id: "string",
        handle: "string",
        title: "string",
        featuredImage: {
          url: "string",
          altText: "string",
          width: 500,
          height: 500,
        }
      }
    }
  };
  (await cookies()).set('cartId', CartItem.id!);
}
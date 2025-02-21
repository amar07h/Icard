'use server';

//import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { redirect } from 'next/navigation';

export async function redirectToCheckout() {
redirect("/checkout")
}

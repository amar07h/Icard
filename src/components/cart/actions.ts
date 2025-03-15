'use server';
import { redirect } from 'next/navigation';

export async function redirectToCheckout() {
  redirect('/checkout');
}

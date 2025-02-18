//? next import 
import { cookies } from 'next/headers';

import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from '@/components/cart/cart-context';

import { GeistSans } from 'geist/font/sans';
import { ensureStartsWith } from '@/lib/utils'
import { getCart } from '@/lib/server/get';

//? ui 
import { Navbar } from '@/components/layouts/navbar';
import { Toaster } from 'sonner';
import { WelcomeToast } from '@/components/layouts/welcome-toast';
//? cart context using conext hook

const { FACEBOOK_CREATOR, FACEBOOK_SITE, SITE_NAME } = process.env;
const baseUrl = 'http://localhost:3000';
const FACEBOOKCreator = FACEBOOK_CREATOR ? ensureStartsWith(FACEBOOK_CREATOR, '@') : undefined;
const FACEBOOKSite = FACEBOOK_SITE ? ensureStartsWith(FACEBOOK_SITE, 'https://') : undefined;
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(FACEBOOKCreator &&
    FACEBOOKSite && {
      FACEBOOK: {
        card: 'summary_large_image',
        creator: FACEBOOKCreator,
        site: FACEBOOKSite
      }
    })
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartId = (await cookies()).get('cartId')?.value;
  console.log(cartId)
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId);
  return (
    <html lang="en" className={GeistSans.variable}>
    <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
    <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
    </body>
  </html>
  );
}

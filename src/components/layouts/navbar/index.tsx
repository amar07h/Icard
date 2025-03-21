'use client';
import { usePathname } from 'next/navigation';
import CartModal from '@/components/cart/modal';
import LogoSquare from '@/components/logo-square';

import Link from 'next/link';
import { Fragment, Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

//? Menu Types
export type Menu = {
  title: string;
  path: string;
};
export function Navbar() {
  const pathname = usePathname();

  const menu = [
    {
      title: 'Games',
      path: '/games'
    },
    {
      title: 'Console',
      path: '/console'
    },
    {
      title: 'Streming',
      path: '/streaming'
    },
    {
      title: 'card banker',
      path: '/financier'
    }
  ];

  return (
    <Fragment>
      {pathname === '/checkout' ? null : (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          <div className="flex w-full items-center">
            <div className="flex w-full md:w-1/3">
              <Link
                href="/"
                prefetch={true}
                className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
              >
                <LogoSquare />
              </Link>
              {menu.length ? (
                <ul className="ml-8 hidden gap-6 text-sm md:flex md:items-center">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        className="text-lg capitalize text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="hidden justify-center md:flex md:w-1/3">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <div className="flex justify-end md:w-1/3">
              <CartModal />
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
}

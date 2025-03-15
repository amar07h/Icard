import Image from 'next/image';
import { ComponentProps } from 'react';

export default function LogoIcon(props: ComponentProps<'img'>) {
  return (
    <Image
      src="/logo.Webp"
      height={500}
      width={500}
      alt="logo"
      className="w-42 mt-9 h-28 max-w-60"
    />
  );
}

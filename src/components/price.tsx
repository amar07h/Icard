import clsx from 'clsx';

const Price = ({
  amount,
  className,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>

  </p>
);

export default Price;

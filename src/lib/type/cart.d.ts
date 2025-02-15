export type Cart = Omit<CartServer, 'lines'> & {
    lines: CartItem[];
  };
  export type Money = {
    amount: string;
    currencyCode: string;
  };
export type CartServer = {
    id: string | undefined;
    checkoutUrl: string;
    cost: {
      subtotalAmount: Money;
      totalAmount: Money;
      totalTaxAmount: Money;
    };
    lines:CartItem;
    totalQuantity: number;
  };
  export type CartItem = {
    id: string | undefined;
    quantity: number;
    cost:  {
        totalAmount: Money;
      };
    merchandise: {
      id: string;
      title: string;
      selectedOptions: {
        name: string;
        value: string;
      }[];
      product: CartProduct;
    };
  };
  export type CartProduct = {
    id: string;
    handle: string;
    title: string;
    featuredImage: Image;
  };
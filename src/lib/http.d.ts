import {OwnProduct} from "./type"

  export type ServerCollectionProductsOperation = {
    data: {
      collection: {
        products: Connection<OwnProduct>;
      };
    };
    variables: {
      handle: string;
      reverse?: boolean;
      sortKey?: string;
    };
  };
import {ServerCollectionProductsOperation} from "@/lib/http"
import {OwnProduct, Product,Image} from "@/lib/type"
const domain = "http://localhost:3000/"
import {TAGS,HIDDEN_PRODUCT_TAG } from '@/lib/server/constant';

const endpoint = `${domain}${"api"}`;
type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function ServerFetch<T>({
  cache = 'force-cache',
  headers,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (e) {
      throw {
        cause: e.toString() || 'unknown',
        status:  500,
        message: "error",
      };
    }

    throw {
      error: e,
      
    };
  }
}

  export async function getCollectionProducts({
    collection,
    reverse,
    sortKey
  }: {
    collection:string
    reverse?: boolean;
    sortKey?: string;
  }): Promise<Product[]> {
    const res = await ServerFetch<ServerCollectionProductsOperation>({
      tags: [TAGS.collections, TAGS.products],
      variables: {
        handle: collection,
        reverse,
        sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
      }
    });
  
    if (!res.body.data.collection) {
      console.log(`No collection found for \`${collection}\``);
      return [];
    }
    console.log(res.body.data)
    return res.body.data.collection.products
   // return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
  }
  
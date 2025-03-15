import { notFound } from 'next/navigation';
const domain = 'http://localhost:3000/api/';
export async function ServerFetch(endpoint: string) {
  try {
    const result = await fetch(`${domain}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const body = await result.json();
    return {
      body: body
    };
  } catch (e) {
    console.log(e);
  }
}
export async function GetOffre() {
  const res = await ServerFetch('offre');
  if (res?.body === 'not found') return notFound();
  return res?.body;
}

export async function GetCarsoul($parms: string) {
  const res = await ServerFetch(`carsoul?search=${$parms}`);
  if (res?.body === 'not found') return notFound();

  return res?.body;
}
export async function GetSinglData($parms: string) {
  const res = await ServerFetch(`data?search=${$parms}`);
  if (res?.body === 'not found') return notFound();
  return res?.body;
}
export async function getProductRecommendations($parms: string) {
  const res = await ServerFetch(`tag?tag=${$parms}`);
  return res?.body;
}
export async function VerifyCoupon($parms: string) {
  const res = await ServerFetch(`coupon?coupon=${$parms}`);
  return res?.body;
}


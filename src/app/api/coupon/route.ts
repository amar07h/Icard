import { NextResponse,NextRequest } from "next/server"
import data from "@/app/api/coupon/coupon.json"
export async function GET(req:NextRequest){
  const ref=req.url.split('=').reverse()[0]
  
    try {
    const result = data.discount.find(i => i.code === ref);
    if (result) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json("not found", { status: 404 });
    }
} catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart data" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server"
import data from "@/app/api/carsoul/data.json"
import data2 from "@/app/api/carsoul/data2.json"
export async function GET(){
    try {
    const result = data.product;
    const result2 = data2.product;
    return NextResponse.json({result,result2});
} catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart data" },
      { status: 500 }
    );
  }
}
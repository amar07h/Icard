import { NextResponse } from "next/server"
import data from "@/app/api/carsoul/data.json"
export async function GET(){
    try {
    const result = data.product;
    return NextResponse.json(result, { status: 200 });
} catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart data" },
      { status: 500 }
    );
  }
}
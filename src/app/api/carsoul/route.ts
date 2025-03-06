import { NextResponse,NextRequest } from "next/server"
import data from "@/app/api/carsoul/data.json"
export async function GET(req:NextRequest){
  const $params=req.url.split('=').reverse()[0]
  if($params==="all"){
    try {
      const games = data.product.filter(i => i.categories === "games");
      const streaming = data.product.filter(i => i.categories === "streaming");
      const console = data.product.filter(i => i.categories === "console");

      return NextResponse.json({games,streaming,console});
  } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch cart data" },
        { status: 500 }
      );
    }
  }
  else {
    try {

    const result = data.product.filter(i => i.categories === $params);
      return NextResponse.json({result});
  } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch cart data" },
        { status: 500 }
      );
    }
  }
  
}
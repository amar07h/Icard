import { NextResponse,NextRequest } from "next/server"
import data from "@/app/api/carsoul/data.json"
import data2 from "@/app/api/carsoul/data2.json"
export async function GET(req:NextRequest){
  const $params=req.url.split('=').reverse()[0]
  console.log("$params")
  console.log($params)
  if($params==="all"){
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
  else {
    const result = data.product.filter(i => i.categories === $params);
    console.log(result)
    try {
      return NextResponse.json({result});
  } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch cart data" },
        { status: 500 }
      );
    }
  }
  
}
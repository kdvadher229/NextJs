import { notFound } from "next/navigation"

export default function ProductDetails({params}:{params: { productId: string,catId:string }}) {
  if(parseInt(params.productId )>100){
    notFound()
  }
  
  return (
    <h1>Product ID {params.productId} and product category is {params.catId}</h1>
  )
}

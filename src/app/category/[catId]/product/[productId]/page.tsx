
export default function ProductDetails({params}:{params: { productId: string,catId:string }}) {
  return (
    <h1>Product ID {params.productId} and product category is {params.catId}</h1>
  )
}

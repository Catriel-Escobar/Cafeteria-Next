import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddCartButton from "./AddCartButton"
interface ProductCardProps {
    product :Product
}
export default function ProductCard({product}:ProductCardProps) {
  return (
    <div className="border bg-white min-h-[700px] flex flex-col justify-between">
        <Image src={`/products/${product.image}.jpg`} alt={`product platillo ${product.name}`} width={400} height={500} quality={100} />
        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
          <AddCartButton product ={product}/>
        </div>
    </div>
  )
}

import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

interface OrderPageParams {
  params: {
    category: string
  }
}

const getProducts = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  })
  return products
}
export default async function OrderPage({ params }: OrderPageParams) {
  const products = await getProducts(params.category)

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuacion</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

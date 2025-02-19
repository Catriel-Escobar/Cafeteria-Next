import OrderCard from "@/components/order/OrderCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getPedingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })
  return orders
}

export default async function OrderAdminPage() {
  const orders = await getPedingOrders()

  return (
    <>
      <Heading>Administrar Ordenes</Heading>
      {orders.length === 0 ? (
        "No hay ordenes pendientes"
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </>
  )
}

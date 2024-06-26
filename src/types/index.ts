import { Category, Order, OrderProducts, Product } from "@prisma/client"

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number
  subtotal: number
}

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product
  })[]
}

export type ProductCategories = Product & {
  category: Category
}

export interface IProductCategories extends Product {
  category: Category
}

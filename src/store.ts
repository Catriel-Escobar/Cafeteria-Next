import { create } from "zustand"
import { OrderItem } from "./types"
import { Product } from "@prisma/client"
import { MAX_ITEMS, MIN_ITEMS } from "@/components/order/ProductDetails"

interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void
  increaseQuantity: (id: Product["id"]) => void
  decreaseQuantity: (id: Product["id"]) => void
  removeItem: (id: Product["id"]) => void
  clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product
    let items: OrderItem[] = []
    if (get().order.find((item) => item.id === product.id)) {
      items = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                item.quantity == MAX_ITEMS ? item.quantity : item.quantity + 1,
              subtotal:
                item.quantity === MAX_ITEMS
                  ? item.subtotal
                  : item.price * (item.quantity + 1),
            }
          : item
      )
    } else {
      items = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * data.price,
        },
      ]
    }
    set(() => ({
      order: items,
    }))
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity == MAX_ITEMS ? item.quantity : item.quantity + 1,
              subtotal:
                item.quantity === MAX_ITEMS
                  ? item.subtotal
                  : item.price * (item.quantity + 1),
            }
          : item
      ),
    }))
  },
  decreaseQuantity(id) {
    let item: OrderItem[] = []

    item = get().order.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity === MIN_ITEMS ? item.quantity : item.quantity - 1,
            subtotal:
              item.quantity === MIN_ITEMS
                ? item.subtotal
                : item.subtotal - item.price,
          }
        : item
    )
    set(() => ({
      order: item,
    }))
  },
  removeItem(id) {
    let item: OrderItem[] = []
    item = get().order.filter((item) => item.id !== id)
    set(() => ({
      order: item,
    }))
  },
  clearOrder() {
    set(() => ({
      order: [],
    }))
  },
}))

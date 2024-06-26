"use client"
import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {
  const router = useRouter()
  const handleSearchForm = async (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    }
    const result = SearchSchema.safeParse(data)
    console.log(result)
    if (!result.success) {
      result.error.issues.forEach((error) => {
        console.log(error.message)
        toast.error(error.message)
      })
      return
    }
    // redirect(`/admin/products/search?search=${result.data.search}`)

    router.push(`/admin/products/search?search=${result.data.search}`)
  }
  return (
    <form className="flex items-center" action={handleSearchForm}>
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
      />
      <input
        type="submit"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
        value={"Buscar"}
      />
    </form>
  )
}

import Link from "next/link"

interface ProductsPagination {
  page: number
  totalPages: number
}

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPagination) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          href={`/admin/products?page=${page - 1}`}>
          &laquo;
        </Link>
      )}
      {pages.map((currentPage) => (
        <Link
          className={`${
            page === currentPage && "font-black"
          } bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
          href={`/admin/products?page=${currentPage}`}
          key={currentPage}>
          {currentPage}
        </Link>
      ))}
      {page < totalPages && (
        <Link
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          href={`/admin/products?page=${page + 1}`}>
          &raquo;
        </Link>
      )}
    </nav>
  )
}

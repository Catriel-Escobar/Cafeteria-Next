"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminRoute {
  link: {
    url: string
    text: string
    blank: boolean
  }
}

export default function AdminRoute({ link }: AdminRoute) {
  const pathName = usePathname()
  const isActived = pathName.startsWith(link.url)

  return (
    <Link
      className={`${
        isActived ? "bg-amber-400" : ""
      } font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
      href={link.url}
      target={link.blank ? "_blank" : ""}>
      {link.text}
    </Link>
  )
}

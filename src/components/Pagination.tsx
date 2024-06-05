import { cn } from "@/lib/utils"
import { JobFilterValues } from "@/lib/validation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"


interface PaginationProps {
  currentPage: number
  totalPages: number
  filterValues: JobFilterValues
}

const Pagination = ({
  currentPage,
  totalPages,
  filterValues: {
    q,
    type,
    location,
    remote
  }
}: PaginationProps) => {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: 'true' }),
      page: page.toString()
    })

    return `/?${searchParams.toString()}`
  }

  return (
    <div className="flex justify-between">
      <Link
        className={cn(
          "flex items-center gap-2 font-semibold dark:bg-blue-500 dark:text-muted-foreground px-3 py-2 rounded-md",
          currentPage <= 1 && "invisible"
        )}
        href={generatePageLink(currentPage - 1)}>
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold mt-2 mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        className={cn(
          "flex items-center gap-2 font-semibold dark:bg-blue-500 dark:text-muted-foreground text-white px-3 py-2 rounded-md",
          currentPage >= totalPages && "invisible"
        )}
        href={generatePageLink(currentPage + 1)} >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export default Pagination
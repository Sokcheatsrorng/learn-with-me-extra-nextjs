

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationType = {
    page: number,
    limit:string,
    previous: number
    next: number
}

export function PaginationProducts({page,previous,next}: PaginationType) {
  return (-
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${previous}`} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`?page=${page}`}>{page }</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`?page=${page + 1}`} isActive>
            {page + 1}
          </PaginationLink>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem> */}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`?page=${next}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

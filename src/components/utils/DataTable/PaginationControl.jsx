import { Button, ButtonGroup, HStack, IconButton } from "@chakra-ui/react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  onPageChange,
}) {
  const getPageNumbers = (currentPage, totalPages) => {
    let startPage, endPage

    if (totalPages === 0) {
      return []
    }

    if (totalPages <= 10) {
      startPage = 1
      endPage = totalPages
    } else {
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    )
  }

  return (
    <HStack justify={"center"} p={2}>
      <ButtonGroup isAttached>
        <Button
          variant={"outline"}
          onClick={() => onPageChange(1)}
          isDisabled={currentPage === 1}
        >
          1
        </Button>
        <IconButton
          icon={<FaChevronLeft />}
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        />
        {getPageNumbers(currentPage, totalPages).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "solid" : "outline"}
            colorScheme={page === currentPage ? "purple" : "gray"}
            onClick={() => onPageChange(page)}
            isDisabled={page === currentPage}
          >
            {page}
          </Button>
        ))}
        <IconButton
          icon={<FaChevronRight />}
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={!hasNextPage}
        />
        <Button
          variant={"outline"}
          onClick={() => onPageChange(totalPages)}
          isDisabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>
      </ButtonGroup>
    </HStack>
  )
}

export default PaginationControls

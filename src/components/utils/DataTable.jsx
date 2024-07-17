import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { useSearchParams } from "react-router-dom"
import {
  convertTo12HourFormat,
  formatCurrency,
  formatDate,
  getSearchParams,
} from "../../utils/utils"

function DataTable({
  data,
  columns,
  paginationData,
  changePage,
  changeLimit,
  firstFilter,
  actionIcon,
  actionButton,
  onActionButtonClick,
  fetchData,
}) {
  const {
    totalItems,
    currentPage,
    totalPages,
    hasNextPage,
    limit,
    countInCurrentPage,
  } = paginationData || {}

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangePageClick = (page) => {
    changePage(page, limit)
    setSearchParams({ ...getSearchParams(searchParams), page })
  }

  const handleChangeLimit = (option) => {
    changeLimit(currentPage, option.value)
    setSearchParams({ ...getSearchParams(searchParams), limit: option.value })
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(data)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  const handleSearch = async (e) => {
    const term = e.target.value
    setSearchTerm(term)
    setError(null)

    if (term) {
      const filtered = data.filter((item) =>
        columns.some(
          (column) =>
            column.searchable &&
            item[column.name]?.toString().toLowerCase().includes(term.toLowerCase())
        )
      )

      if (filtered.length === 0) {
        setIsLoading(true)
        try {
          const fetchedData = await fetchData(term)
          setFilteredData(fetchedData)
          if (fetchedData.length === 0) {
            setError("No matching records found")
          }
        } catch (error) {
          setError("Error fetching data")
        } finally {
          setIsLoading(false)
        }
      } else {
        setFilteredData(filtered)
      }
    } else {
      setFilteredData(data)
    }
  }

  const limitOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "40", value: 40 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ]

  const onActionClick = (property) => {
    onActionButtonClick(property)
  }

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

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const getModifiedValue = (item, column) => {
    let value = item[column.name]
    if (column.fallBackName) value = value ? value : item[column.fallBackName]
    if (column.isDate) value = formatDate(value, "dd-mon-yyyy")
    if (column.isTime) value = convertTo12HourFormat(value)
    if (column.isBoolean) value = value ? "Yes" : "No"
    if (column.isCurrency)
      value = formatCurrency(Math.ceil(value), "en-IN", false, "INR")
    return value ?? "-"
  }

  return (
    <TableContainer>
      <Flex my={2} gap={4}>
        <Box flex={2} hidden={!paginationData || !paginationData.limit}>
          <FormControl w={"fit-content"}>
            <Select
              placeholder="Change Limit"
              onChange={handleChangeLimit}
              tagVariant={"solid"}
              colorScheme="purple"
              options={limitOptions}
              value={{ label: "Limit " + limit, value: limit }}
            />
          </FormControl>
        </Box>
        <FormControl display={"flex"} gap={3} flex={3}>
          <InputGroup>
            <Input placeholder="Search" onChange={handleSearch} />
            <InputRightElement children={<FiSearch />} borderRadius="10px" />
          </InputGroup>
          <Button colorScheme="purple">Search</Button>
        </FormControl>
        <Flex flex={2} justifyContent={"end"}>
          {/* <HStack gap={3}>
                        <FilterMenu />
                        <Button variant={"outline"}>Generate Report</Button>
                    </HStack> */}
        </Flex>
      </Flex>

      {isLoading ? (
        <Box textAlign="center" py={4}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Box>
      ) : error ? (
        <Box textAlign="center" py={4}>
          <Alert status="error" variant={"left-accent"}>
            <AlertIcon />
            <AlertTitle> Error fetching data </AlertTitle>
            <AlertDescription> {error}</AlertDescription>
          </Alert>
        </Box>
      ) : (
        <Table variant={"simple"} size={"sm"}>
          <Thead>
            <Tr>
              <Th p={3}>Sr. No</Th>
              {columns.map((column, index) => (
                <Th
                  isNumeric={column.isNumeric}
                  whiteSpace="normal"
                  p={3}
                  key={column.label}
                >
                  {column.label}
                </Th>
              ))}
              {actionButton && <Th p={3}>Action</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, i) => (
                <Tr key={item.id}>
                  <Td whiteSpace="normal" p={3}>
                    {i + 1}
                  </Td>
                  {columns.map((column, index) => (
                    <Td
                      isNumeric={column.isNumeric}
                      whiteSpace="normal"
                      p={2}
                      key={index}
                    >
                      {getModifiedValue(item, column)}{" "}
                    </Td>
                  ))}
                  {actionButton && (
                    <Td>
                      {actionIcon ? (
                        <IconButton
                          size={"sm"}
                          icon={actionIcon}
                          onClick={() => onActionClick(item)}
                        />
                      ) : (
                        <Button size={"sm"} onClick={() => onActionClick(item)}>
                          {actionButton}
                        </Button>
                      )}
                    </Td>
                  )}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length + 1} textAlign={"center"}>
                  No Data
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      )}

      {paginationData !== undefined && paginationData.totalItems !== 0 && (
        <HStack justify={"center"} p={2}>
          <ButtonGroup isAttached>
            <Button
              variant={"outline"}
              onClick={() => handleChangePageClick(1)}
              isDisabled={currentPage === 1}
            >
              1
            </Button>
            <IconButton
              icon={<FaChevronLeft />}
              onClick={() => handleChangePageClick(currentPage - 1)}
              isDisabled={currentPage === 1}
            />
            {getPageNumbers(currentPage, totalPages).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "solid" : "outline"}
                colorScheme={page === currentPage ? "purple" : "gray"}
                onClick={() => handleChangePageClick(page)}
                isDisabled={page === currentPage}
              >
                {page}
              </Button>
            ))}
            <IconButton
              icon={<FaChevronRight />}
              onClick={() => handleChangePageClick(currentPage + 1)}
              isDisabled={!hasNextPage}
            />
            <Button
              variant={"outline"}
              onClick={() => handleChangePageClick(totalPages)}
              isDisabled={currentPage === totalPages}
            >
              {totalPages}
            </Button>
          </ButtonGroup>
        </HStack>
      )}
    </TableContainer>
  )
}

export default DataTable

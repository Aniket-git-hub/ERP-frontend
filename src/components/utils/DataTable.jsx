import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  FormControl,
  Spinner,
  Table,
  TableContainer,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from '../../hooks/useDebounce';
import {
  convertTo12HourFormat,
  formatCurrency,
  formatDate,
  getSearchParams,
} from "../../utils/utils";
import DataTableBody from "./DataTable/DataTable";
import PaginationControls from "./DataTable/PaginationControl";
import SearchInput from "./DataTable/SearchInput";
import DataTableHeader from "./DataTable/TableHeader";

function DataTable({
  data,
  columns,
  paginationData,
  changePage,
  changeLimit,
  actionIcon,
  actionButton,
  onActionButtonClick,
  fetchData,
  searchOnInput = false,
}) {
  const {
    totalItems,
    currentPage,
    totalPages,
    hasNextPage,
    limit,
  } = paginationData || {};

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePageClick = (page) => {
    changePage(page, limit);
    setSearchParams({ ...getSearchParams(searchParams), page });
  };

  const handleChangeLimit = (option) => {
    changeLimit(currentPage, option.value);
    setSearchParams({ ...getSearchParams(searchParams), limit: option.value });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, flush] = useDebounce(searchTerm);
  const [filteredData, setFilteredData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (searchOnInput) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setError(null);
  };

  const handleSearchButtonClick = () => {
    flush();
    performSearch(searchTerm);
  };

  const performSearch = async (term) => {
    if (term) {
      const filtered = data.filter((item) =>
        columns.some(
          (column) =>
            column.searchable &&
            item[column.name]?.toString().toLowerCase().includes(term.toLowerCase())
        )
      );

      if (filtered.length === 0) {
        if (fetchData) {
          setIsLoading(true);
          try {
            const fetchedData = await fetchData(term);
            setFilteredData(fetchedData);
            if (fetchedData.length === 0) {
              setError("No matching records found");
            }
          } catch (error) {
            setError("Error fetching data");
          } finally {
            setIsLoading(false);
          }
        } else {
          setFilteredData([]);
          setError("No matching records found");
        }
      } else {
        setFilteredData(filtered);
      }
    } else {
      setFilteredData(data);
    }
  };

  const limitOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "40", value: 40 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const onActionClick = (property) => {
    onActionButtonClick(property);
  };

  const getModifiedValue = (item, column) => {
    let value = item[column.name];
    if (column.fallBackName) value = value ? value : item[column.fallBackName];
    if (column.isDate) value = formatDate(value, "dd-mon-yyyy");
    if (column.isTime) value = convertTo12HourFormat(value);
    if (column.isBoolean) value = value ? "Yes" : "No";
    if (column.isCurrency)
      value = formatCurrency(Math.ceil(value), "en-IN", false, "INR");
    return value ?? "-";
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortData = (data, key, direction) => {
    return data.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  };

  const handleSortClick = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column.name && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column.name, direction });
    setFilteredData(sortData(filteredData, column.name, direction));
  };

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
        <SearchInput
          searchTerm={searchTerm}
          onChange={handleSearchInputChange}
          onSearch={handleSearchButtonClick}
        />
        <Flex flex={2} justifyContent={"end"}>
          {/* Add additional controls if needed */}
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
            <AlertTitle>Error fetching data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Box>
      ) : (
        <Table variant={"simple"} size={"sm"}>
          <DataTableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSortClick}
          />
          <DataTableBody
            filteredData={filteredData}
            columns={columns}
            actionButton={actionButton}
            actionIcon={actionIcon}
            onActionClick={onActionClick}
            getModifiedValue={getModifiedValue}
          />
        </Table>
      )}

      {paginationData && paginationData.totalItems !== 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          onPageChange={handleChangePageClick}
        />
      )}
    </TableContainer>
  );
}

export default DataTable;

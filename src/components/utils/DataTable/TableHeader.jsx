import { HStack, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function DataTableHeader({ columns, sortConfig, onSort, actionButton }) {
    return (
        <Thead>
            <Tr>
                <Th p={3}>Sr. No</Th>
                {columns.map((column) => (
                    <Th
                        key={column.label}
                        isNumeric={column.isNumeric}
                        whiteSpace="normal"
                        p={3}
                        onClick={() => column.isSortable && onSort(column)}
                        cursor={column.isSortable ? "pointer" : "default"}
                    >
                        <HStack gap={1} display={"flex"} direction={"column"} alignItems={"center"}>
                            <Text>{column.label}</Text>
                            <Text>
                                {column.isSortable &&
                                    (sortConfig.key === column.name ? (
                                        sortConfig.direction === "asc" ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )
                                    ) : (
                                        <FaChevronDown />
                                    ))}
                            </Text>
                        </HStack>
                    </Th>
                ))}
                {actionButton && <Th p={3}>Action</Th>}
            </Tr>
        </Thead>
    );
}

export default DataTableHeader;

import { Button, IconButton, Tbody, Td, Tr } from "@chakra-ui/react";

function DataTableBody({ filteredData, columns, actionButton, actionIcon, onActionClick, getModifiedValue }) {
    return (
        <Tbody>
            {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                    <Tr key={item.id}>
                        <Td whiteSpace="normal" p={3}>
                            {i + 1}
                        </Td>
                        {columns.map((column, index) => (
                            <Td
                                key={index}
                                isNumeric={column.isNumeric}
                                whiteSpace="normal"
                                p={2}
                            >
                                {getModifiedValue(item, column)}
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
    );
}

export default DataTableBody;

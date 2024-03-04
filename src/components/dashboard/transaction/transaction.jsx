import { Box, Flex, Heading, Table, TableContainer, Th, Thead } from "@chakra-ui/react"

function Transaction() {
    return (
        <Box>
            <Flex>
                <Heading size={'md'} color={'gray.700'}>Transaction this month</Heading>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Th>
                                Sr. No
                            </Th>
                            <Th>Amount</Th>

                        </Thead>
                    </Table>
                </TableContainer>
            </Flex>
        </Box>
    )
}

export default Transaction
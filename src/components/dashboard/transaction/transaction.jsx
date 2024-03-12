import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useData } from "../../../hooks/useData"
import { formatDate } from "../../../utils/utils"

function Transaction() {
    const { transactions } = useData()
    const fields = [
        {
            horizontal: true,
            inputs: [

                { name: "firstName", label: "First Name", type: "text", required: true },
                { name: "lastName", label: "Last Name", type: "text", required: true },
            ]
        },
        {
            inputs: [

                { name: "email", label: "Email", type: "email", required: true, },
                { name: "password", label: "Password", type: "password", required: true },
            ]
        },
        {
            horizontal: true,
            inputs: [

                { name: "age", label: "Age", type: "number", required: true, rightAddOn: "years" },
                { name: "bloodGroup", label: "Blood Group", type: "select", options: [{ value: 1, label: "O" }, { value: 2, label: "B" }], required: true },
            ]
        },
        {
            inputs: [

                { name: "address", label: "Address", type: "textarea", required: true, },
            ]
        },

    ]
    const initialState = { firstName: '', lastName: "", email: "", password: "", age: "", bloodGroup: "", address: "" }
    return (
        <Box>
            <Heading size={'md'} color={'gray.700'}>Transaction this month</Heading>
            <Flex>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>

                                <Th>#</Th>
                                <Th>date</Th>
                                <Th>type</Th>
                                <Th isNumeric>Amount</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                transactions && transactions.length > 0 &&
                                transactions.map((transaction, index) => (
                                    <Tr fontWeight={'semibold'} color={transaction.type === 'credit' ? 'green.700' : 'red.600'} key={`${transaction.date}-${index}`}>
                                        <Td>{index + 1}</Td>
                                        <Td>{formatDate(transaction.date, 'dd-mon-yyyy')}</Td>
                                        <Td>{transaction.type}</Td>
                                        <Td isNumeric>{transaction.amount}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                {/* <CustomForm
                    submitButtonText={"Submit"}
                    loadingText={"submitting..."}
                    fields={fields}
                    initialState={initialState}
                /> */}
            </Flex>
        </Box>
    )
}

export default Transaction
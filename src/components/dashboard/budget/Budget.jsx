import { Box, Button, Flex, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FaRupeeSign } from "react-icons/fa"
import { useData } from "../../../hooks/useData"
import { currentDate, formatCurrency, formatDate } from "../../../utils/utils"
import StatCard from "../../utils/StartCard"
import AddNewBudget from "./AddNewBudget"

function Budget() {
    const { budgets } = useData()
    const cards = [
        { title: 'Total Budget Current Month', data: 25000, icon: <FaRupeeSign /> },
        { title: 'Total Budget Last Month', data: 45000, icon: <FaRupeeSign /> },
        { title: 'Total Budget Current Year', data: 125000, icon: <FaRupeeSign /> },
        { title: 'Total Budget Last Year', data: 85000, icon: <FaRupeeSign /> },
    ]
    return (
        <Box>
            <Flex w={'100%'} justifyContent={'space-between'}>
                <Heading size={'lg'} color={'gray.700'}>{currentDate()}</Heading>
                <HStack>
                    <AddNewBudget />
                    <Button variant={'outline'}> Download Report</Button>
                </HStack>
            </Flex>
            <Flex gap={10} w={'100%'} justifyContent={'space-between'} my={5}>
                {
                    cards.map((card, index) => (
                        <StatCard
                            title={card.title}
                            icon={card.icon}
                            data={formatCurrency(card.data, 'en-IN', false, 'INR')}
                            key={index}
                        />

                    ))
                }

            </Flex>
            <HStack w={"100%"} gap={10} justifyContent={'space-between'}>
                <TableContainer flex={1}>
                    <Table size="md" variant={'striped'}>
                        <TableCaption>Current Month</TableCaption>
                        <Thead>
                            <Tr>
                                <Th> #</Th>
                                <Th> Date</Th>
                                <Th> Category</Th>
                                <Th isNumeric> Amount </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                budgets && budgets.length > 0 &&
                                budgets.map((budget, index) => (
                                    <Tr key={budget.expenseCategoryId}>
                                        <Td>{index + 1}</Td>
                                        <Td>{formatDate(budget.date, 'dd-mon-yyyy')}</Td>
                                        <Td>{budget?.expense_category?.name}</Td>
                                        <Td isNumeric>{budget.amount}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <TableContainer flex={1}>
                    <Table size="md" variant={'striped'}>
                        <TableCaption>Last Month</TableCaption>
                        <Thead>
                            <Tr>
                                <Th> #</Th>
                                <Th> Date</Th>
                                <Th> Category</Th>
                                <Th isNumeric> Amount </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                budgets && budgets.length > 0 &&
                                budgets.map((budget, index) => (
                                    <Tr key={budget.expenseCategoryId}>
                                        <Td>{index + 1}</Td>
                                        <Td>{formatDate(budget.date, 'dd-mon-yyyy')}</Td>
                                        <Td>{budget?.expense_category?.name}</Td>
                                        <Td isNumeric>{budget.amount}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </HStack>
        </Box>

    )
}

export default Budget
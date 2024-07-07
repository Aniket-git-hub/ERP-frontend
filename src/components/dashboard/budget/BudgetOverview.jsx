import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  List,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { FaRupeeSign } from "react-icons/fa"
import { useData } from "../../../hooks/useData"
import { currentDate, formatCurrency } from "../../../utils/utils"
import StatCard from "../../utils/StartCard"
import AddNewBudget from "./AddNewBudget"
import AddNewExpense from "./AddNewExpense"

function BudgetOverview() {
  const { expenses, expenseCategories } = useData()

  const transactions = [
    { date: "22/10/2033", description: "Rent", amount: 7000, type: "debit" },
    {
      date: "22/10/2033",
      description: "Salary",
      amount: 12000,
      type: "credit",
    },
    {
      date: "22/10/2033",
      description: "Groceries",
      amount: 500,
      type: "debit",
    },
  ]

  const cards = [
    { title: "Start Balance", data: 25000, icon: <FaRupeeSign /> },
    { title: "End Balance", data: 45000, icon: <FaRupeeSign /> },
    { title: "Total Income", data: 125000, icon: <FaRupeeSign /> },
    { title: "Total Expense", data: 85000, icon: <FaRupeeSign /> },
  ]
  return (
    <Box>
      <Flex w={"100%"} justifyContent={"space-between"}>
        <Heading size={"lg"} color={"gray.700"}>
          {currentDate()}
        </Heading>
        <HStack>
          <AddNewExpense />
          <AddNewBudget />
        </HStack>
      </Flex>

      <Flex gap={10} w={"100%"} justifyContent={"space-between"} my={5}>
        {cards.map((card, index) => (
          <StatCard
            title={card.title}
            icon={card.icon}
            data={formatCurrency(card.data, "en-IN", false, "INR")}
            key={card.title}
          />
        ))}
      </Flex>

      <Flex>
        <Card>
          <CardBody>
            <Heading size={"md"} color={"gray.700"}>
              Expenses
            </Heading>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th isNumeric>Planned</Th>
                    <Th isNumeric>Actual</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {expenses &&
                    expenses.length > 0 &&
                    expenses.map((expense, index) => (
                      <Tr key={expense.expenseCategoryId + index}>
                        <Td>{expense?.expense_category?.name}</Td>
                        <Td isNumeric>7000</Td>
                        <Td isNumeric>{expense.amount}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
        <Card width={"30%"} borderRadius={"15px"}>
          <CardBody textAlign={"center"}>
            <Heading size={"md"} color={"gray.700"}>
              Recent Transactions
            </Heading>
            <List mt={5}>
              {transactions.map((transaction, index) => (
                <>
                  <ListItem
                    py={3}
                    px={5}
                    key={`${transaction.date}-${transaction.id}`}
                  >
                    <Flex
                      w={"100%"}
                      justifyContent={"space-between"}
                      color={
                        transaction.type == "debit" ? "red.600" : "green.600"
                      }
                      fontWeight={"semibold"}
                      fontSize={"lg"}
                    >
                      <Text>{transaction.date}</Text>
                      <Text>{transaction.description}</Text>
                      <Text>
                        {transaction.type == "credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </Text>
                    </Flex>
                  </ListItem>
                  {index !== transactions.length - 1 && <Divider />}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  )
}

export default BudgetOverview

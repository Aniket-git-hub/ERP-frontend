import { AddIcon } from "@chakra-ui/icons";
import {
    Box, Button, Card, CardBody,
    Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Icon, Input, InputGroup, InputRightAddon, List, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { FaRupeeSign } from "react-icons/fa";
import { currentDate, formatCurrency } from "../../../utils/utils";
import StatCard from "../../utils/StartCard";

function BudgetOverview() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const transactions = [
        { date: '22/10/2033', description: 'Rent', amount: 7000, type: 'debit' },
        { date: '22/10/2033', description: 'Salary', amount: 12000, type: 'credit' },
        { date: '22/10/2033', description: 'Groceries', amount: 500, type: 'debit' },
    ];

    const cards = [
        { title: 'Start Balance', data: 25000, icon: <FaRupeeSign /> },
        { title: 'End Balance', data: 45000, icon: <FaRupeeSign /> },
        { title: 'Total Income', data: 125000, icon: <FaRupeeSign /> },
        { title: 'Total Expense', data: 85000, icon: <FaRupeeSign /> },
    ]
    return (
        <Box >
            <Flex w={'100%'} justifyContent={'space-between'}>
                <Heading size={'lg'} color={'gray.700'}>{currentDate()}</Heading>
                <HStack>
                    <Button colorScheme="purple" leftIcon={<Icon as={AddIcon} />} onClick={() => onOpen()}> Add Expense</Button>
                    <Button colorScheme="purple" leftIcon={<Icon as={AddIcon} />}> New Budget</Button>
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

            <Flex>
                <Card>
                    <CardBody>
                        <Heading size={'md'} color={'gray.700'}>Expenses</Heading>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Category</Th>
                                        <Th isNumeric>Planned</Th>
                                        <Th isNumeric>Actual</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Rent</Td>
                                        <Td isNumeric>7000</Td>
                                        <Td isNumeric>7000</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
                <Card width={'30%'} borderRadius={'15px'}>
                    <CardBody textAlign={'center'}>
                        <Heading size={'md'} color={'gray.700'}>Recent Transactions</Heading>
                        <List mt={5} >

                            {transactions.map((transaction, index) => (
                                <>
                                    <ListItem py={3} px={5}>
                                        <Flex w={'100%'} justifyContent={'space-between'} color={transaction.type == 'debit' ? 'red.600' : 'green.600'} fontWeight={'semibold'} fontSize={'lg'}>
                                            <Text>{transaction.date}</Text>
                                            <Text>{transaction.description}</Text>
                                            <Text>{transaction.type == 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}</Text>
                                        </Flex>
                                    </ListItem>
                                    {index !== transactions.length - 1 && <Divider />}
                                </>
                            ))}

                        </List>
                    </CardBody>
                </Card>
            </Flex>

            {/* modal to add expense */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Expense</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl >
                            <FormLabel>Select Category</FormLabel>
                            <Select
                                options={[
                                    { value: 1, label: 'Rent' }
                                ]}
                                tagVariant={'solid'}
                                colorScheme="purple"
                            />
                            <FormErrorMessage> some error</FormErrorMessage>
                        </FormControl>
                        <HStack>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <Input type="date" />
                                <FormErrorMessage> some error</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Amount</FormLabel>
                                <InputGroup>
                                    <Input type="number" />
                                    <InputRightAddon children={"Rs"} />
                                </InputGroup>
                                <FormErrorMessage> some error</FormErrorMessage>
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea />
                            <FormErrorMessage> some error </FormErrorMessage>
                        </FormControl>
                        <Button my={5} w="full" type="submit" colorScheme="purple">Add Expense</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default BudgetOverview
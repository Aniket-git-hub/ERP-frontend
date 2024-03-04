import { AddIcon } from "@chakra-ui/icons";
import {
    Box, Button,
    Card,
    CardBody,
    Flex,
    FormControl,
    FormLabel,
    HStack, Heading, Icon, Input
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { FaRupeeSign } from "react-icons/fa";
import { useData } from "../../../hooks/useData";
import { currentDate, formatCurrency } from "../../../utils/utils";
import StatCard from "../../utils/StartCard";

function AttendanceOverview() {

    const cards = [
        { title: 'Total Payment', data: 25000, icon: <FaRupeeSign /> },
        { title: 'Highest', data: 45000, icon: <FaRupeeSign /> },
        { title: 'Lowest', data: 125000, icon: <FaRupeeSign /> },
        { title: 'Advances', data: 85000, icon: <FaRupeeSign /> },
    ]
    const { employees } = useData()

    return (
        <Box>
            <Flex w={'100%'} justifyContent={'space-between'}>
                <Heading size={'lg'} color={'gray.700'}>{currentDate()}</Heading>
                <HStack>
                    <Button colorScheme="purple" leftIcon={<Icon as={AddIcon} />} onClick={() => onOpen()}> ADD IN</Button>
                    <Button colorScheme="purple" leftIcon={<Icon as={AddIcon} />}> ADD OUT </Button>
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

            <Flex w={'100%'} gap={10} mt={10}>
                <Card w={'100%'}>
                    <CardBody>
                        <Heading size={'md'} color={'gray.700'}>Add In</Heading>
                        <form>
                            <FormControl isRequired my={2}>
                                <FormLabel>Date</FormLabel>
                                <Input type="date" />
                            </FormControl>
                            <FormControl isRequired my={2}>
                                <FormLabel>Select Employee</FormLabel>
                                <Select
                                    options={[]}

                                />
                            </FormControl>
                            <FormControl isRequired my={2}>
                                <FormLabel>In Time</FormLabel>
                                <Input type="time" />
                            </FormControl>
                            <FormControl my={4}>
                                <Button type="submit" w={"100%"} colorScheme="purple">ADD IN TIME</Button>
                            </FormControl>
                        </form>
                    </CardBody>
                </Card>
                <Card w={'100%'}>
                    <CardBody>
                        <Heading size={'md'} color={'gray.700'}>Add Out</Heading>
                        <form>
                            <FormControl isRequired my={2}>
                                <FormLabel>Date</FormLabel>
                                <Input type="date" />
                            </FormControl>
                            <FormControl isRequired my={2}>
                                <FormLabel>Select Employee</FormLabel>
                                <Select
                                    options={[]}

                                />
                            </FormControl>
                            <FormControl isRequired my={2}>
                                <FormLabel>Out Time</FormLabel>
                                <Input type="time" />
                            </FormControl>
                            <FormControl my={4}>
                                <Button type="submit" w={"100%"} colorScheme="purple">ADD OUT TIME</Button>
                            </FormControl>
                        </form>
                    </CardBody>
                </Card>

            </Flex>

        </Box>
    )
}

export default AttendanceOverview
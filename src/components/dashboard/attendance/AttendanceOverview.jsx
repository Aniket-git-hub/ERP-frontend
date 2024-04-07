import { AddIcon } from "@chakra-ui/icons";
import {
    Box, Button,
    ButtonGroup,
    Card,
    CardBody,
    Flex,
    FormControl,
    FormLabel,
    HStack, Heading, Icon, Input
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { addAttendance } from "../../../api/endpoints/employee/attendances";
import { useData } from "../../../hooks/useData";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { currentDate, formatCurrency } from "../../../utils/utils";
import StatCard from "../../utils/StartCard";

function AttendanceOverview() {

    const cards = [
        { title: 'Total Payment', data: 25000, icon: <FaRupeeSign /> },
        { title: 'Highest', data: 45000, icon: <FaRupeeSign /> },
        { title: 'Lowest', data: 125000, icon: <FaRupeeSign /> },
        { title: 'Advances', data: 85000, icon: <FaRupeeSign /> },
    ]

    const { employeeOptions } = useData()

    const [punchTypeIn, setPunchTypeIn] = useState(new Date().getHours() < 12);

    const initialState = { employeeId: '', checkTimestamp: '' }
    const submit = async (values) => {
        try {
            const { employeeId } = values
            const response = await addAttendance(employeeId, {
                ...values,
                punchType: punchTypeIn ? "in" : "out"
            })
            return { title: "Add Attendance", message: response.data.message }
        } catch (error) {
            throw error;
        }
    }
    const { values, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, submit)

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
                <Card w={'40%'}>
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <Heading size={'md'} color={'gray.700'}>Add Attendance</Heading>

                            <ButtonGroup mt={6} variant={"outline"} isAttached w={"100%"} mb={3}>
                                <Button w={"100%"} colorScheme={punchTypeIn ? "purple" : "gray"} variant={punchTypeIn ? 'solid' : 'outline'} onClick={() => setPunchTypeIn(true)}>IN</Button>
                                <Button w={"100%"} colorScheme={!punchTypeIn ? "purple" : "gray"} variant={!punchTypeIn ? 'solid' : 'outline'} onClick={() => setPunchTypeIn(false)}>OUT</Button>
                            </ButtonGroup>

                            <FormControl isRequired my={2}>
                                <FormLabel>Select Employee</FormLabel>
                                <Select
                                    options={employeeOptions || []}
                                    onChange={handleChange("employeeId")}
                                    value={employeeOptions.filter(e => e.value === values.employeeId)[0] || ''}
                                />
                            </FormControl>

                            <FormControl isRequired my={2}>
                                <FormLabel>Date</FormLabel>
                                <Input type="datetime-local" name="checkTimestamp" value={values.checkTimestamp} onChange={handleChange()} />
                            </FormControl>

                            <FormControl my={4} mt={8}>
                                <Button type="submit" w={"100%"} colorScheme="purple">Add Attendance</Button>
                            </FormControl>
                        </form>
                    </CardBody>
                </Card>

            </Flex>

        </Box>
    )
}

export default AttendanceOverview
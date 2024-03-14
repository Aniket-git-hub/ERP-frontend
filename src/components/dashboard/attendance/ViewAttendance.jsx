import { Box, Button, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAggregateAttendance, getEmployeesAttendance } from "../../../api/data";
import DataTable from "../../utils/DataTable";

function ViewAttendance() {
    const cols = [
        { label: 'Date', name: 'date', isDate: true },
        { label: 'InTime', name: 'inTime', isTime: true, },
        { label: 'OutTime', name: 'outTime', isTime: true, },
    ];
    const [data, setData] = useState([])
    const [aggregateData, setAggregateData] = useState([])
    useEffect(() => {
        const load = async () => {
            try {
                const res = await getEmployeesAttendance(2, '2024-02-01')
                const res2 = await getAggregateAttendance(2, 'monthly', '02')
                setData(res.data.attendance)
                setAggregateData(res2.data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
    }, [])
    return (
        <>
            <Flex w={"100%"} gap={10}>
                <Box flex={1} mr={4}>
                    <Heading px={4} size={'lg'}> Aniket singh</Heading>
                    <List p={4}>
                        <ListItem fontSize={"large"} my={1.6}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Text color={"gray.600"}>Total Hours Worked</Text>
                                <Text fontWeight={"semibold"} color={"gray.700"}>{aggregateData.totalHoursWorked} Hours</Text>
                            </Flex>
                        </ListItem>
                        <ListItem fontSize={"large"} my={1.6}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Text color={"gray.600"}>Total OverTime</Text>
                                <Text fontWeight={"semibold"} color={"gray.700"}>{aggregateData.overtime} Hours</Text>
                            </Flex>
                        </ListItem>
                        <ListItem fontSize={"large"} my={1.6}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Text color={"gray.600"}>Leaves</Text>
                                <Text fontWeight={"semibold"} color={"gray.700"}>{aggregateData.holidays} Days</Text>
                            </Flex>
                        </ListItem>
                        <ListItem fontSize={"large"} my={1.6}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Text color={"gray.600"}>Holidays</Text>
                                <Text fontWeight={"semibold"} color={"gray.700"}>{aggregateData.sundays} Days</Text>
                            </Flex>
                        </ListItem>
                    </List>
                    <Button>Make Payment</Button>
                </Box>
                <Box flex={2} boxShadow={"rgba(149, 157, 165, 0.4) 0px 8px 24px"} p={6} m={3} borderRadius={10}>
                    <DataTable

                        columns={cols}
                        data={data}
                    />
                </Box>
            </Flex>
        </>

    )
}

export default ViewAttendance
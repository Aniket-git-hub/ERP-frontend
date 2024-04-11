import { AddIcon } from "@chakra-ui/icons";
import {
    Box, Button,
    Flex,
    HStack, Heading, Icon
} from "@chakra-ui/react";
import { FaRupeeSign } from "react-icons/fa";
import { currentDate, formatCurrency } from "../../../utils/utils";
import CustomModal from "../../utils/CustomModal";
import StatCard from "../../utils/StartCard";
import AddAttendance from "./AddAttendance";

function AttendanceOverview() {

    const cards = [
        { title: 'Total Payment', data: 25000, icon: <FaRupeeSign /> },
        { title: 'Highest', data: 45000, icon: <FaRupeeSign /> },
        { title: 'Lowest', data: 125000, icon: <FaRupeeSign /> },
        { title: 'Advances', data: 85000, icon: <FaRupeeSign /> },
    ]

    return (
        <Box>
            <Flex w={'100%'} justifyContent={'space-between'}>
                <Heading size={'lg'} color={'gray.700'}>{currentDate()}</Heading>
                <HStack>
                    <CustomModal
                        trigger={(onOpen) => (
                            <Button colorScheme="purple" leftIcon={<Icon as={AddIcon} />} onClick={() => onOpen()}> ADD IN</Button>
                        )}
                        size={"md"}
                        hideFooterClose={true}
                        header={"Add Check In"}
                    >
                        <AddAttendance defaultPunchIn />
                    </CustomModal>
                    <CustomModal
                        trigger={(onOpen) => (
                            <Button colorScheme="purple" leftIcon={<Icon as={AddIcon} />} onClick={() => onOpen()}> ADD OUT</Button>
                        )}
                        size={"md"}
                        hideFooterClose={true}
                        header={"Add Check Out"}
                    >
                        <AddAttendance defaultPunchOut />
                    </CustomModal>
                </HStack>
            </Flex>

            <Flex wrap={"wrap"} gap={10} w={'100%'} justifyContent={'space-between'} my={5}>
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

        </Box>
    )
}

export default AttendanceOverview
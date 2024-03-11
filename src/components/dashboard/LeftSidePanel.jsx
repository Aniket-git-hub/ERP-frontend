import { SettingsIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Divider,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from "@chakra-ui/react";
import { useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { GiExpense, GiMetalBar, GiSpanner } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { IoListSharp } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdOutlinePerson } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavItem from "./NavItem";

function LeftSidePanel() {
    const location = useLocation()
    const sideBarListItems = [
        { name: "Dashboard", icon: HiOutlineRectangleGroup, path: "/" },
        { name: "Jobs", icon: GiSpanner, path: "/jobs" },
        { name: "Clients", icon: MdOutlinePerson, path: "/clients" },
        { name: "Materials", icon: GiMetalBar, path: "/materials" },
        { name: "Invoices", icon: LiaFileInvoiceDollarSolid, path: "/invoices" },
        { name: "Attendance", icon: IoListSharp, path: "/attendance" },
        { name: "Employees", icon: GrUserWorker, path: "/employee" },
        { name: "Budget", icon: GiExpense, path: "/budget" },
        { name: "Income", icon: GiExpense, path: "/income" },
    ];

    const { remove, user } = useAuth()
    const logout = () => {
        remove()
    }

    const navigate = useNavigate()

    const [navSize, setNavSize] = useState('large')

    return (
        <Flex
            pos={"sticky"}
            left={5}
            h={"95vh"}
            margin={"2.5vh"}
            boxShadow={" 0 2px 4px rgba(0, 0, 0, 0.3)"}
            w={navSize == 'small' ? '70px' : "200px"}
            flexDir={"column"}
            borderRadius={navSize == 'small' ? '15px' : '25px'}
            justifyContent={"space-between"}
        >

            <Flex
                p={"8%"}
                direction={'column'}
                alignItems={navSize == 'small' ? 'center' : "flex-start"}
                as={'nav'}

            >
                <IconButton
                    background={'none'}
                    icon={<FiMenu />}
                    _hover={{ background: 'none' }}
                    onClick={() => {
                        if (navSize == 'small') {
                            setNavSize('large')
                        } else {
                            setNavSize('small')
                        }
                    }}
                />

                {
                    sideBarListItems.map((item, index) => (
                        <NavItem key={index} navSize={navSize} icon={item.icon} title={item.name} path={item.path} active={location.pathname == item.path} />
                    ))
                }

            </Flex>

            <Flex
                p={"8%"}
                flexDir={"column"}
                w={"100%"}
                mb={4}
                alignItems={navSize == 'small' ? 'center' : "flex-start"}
            >
                <Divider display={navSize == 'small' ? 'none' : 'flex'} />
                <Menu>

                    <MenuButton>
                        <Flex mt={4} align={'center'}>
                            <Avatar size={"sm"} />
                            <Flex direction={'column'} ml={4} display={navSize == 'small' ? 'none' : 'flex'}>
                                <Heading as={'h3'} size={'sm'} >{user.firstName + " " + user.lastName}</Heading>
                                <Text color={'gray'} textAlign={'left'} >Admin</Text>
                            </Flex>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<SettingsIcon />} onClick={() => navigate("/settings")}>Settings</MenuItem>
                        <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem >
                    </MenuList>
                </Menu>

            </Flex>

        </Flex>
    );
}

export default LeftSidePanel;

import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";


function NavItem({ navSize, icon, path, title, active }) {
    return (
        <Flex
            mt={2}
            direction={'column'}
            w={"100%"}
            alignItems={navSize == 'small' ? 'center' : "flex-start"}
        >
            <Menu >
                <Link
                    as={NavLink}
                    to={path}
                    backgroundColor={active && 'purple.600'}
                    p={2}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: !active && 'purple.200' }}
                    w={navSize == 'large' && '100%'}
                >
                    <MenuButton w={"100%"} h={'100%'}>
                        <Flex align={'center'} >
                            <Icon as={icon} fontSize={"xl"} color={active ? 'purple.50' : 'gray.500'} />
                            <Text ml={5} color={active && 'purple.50'} fontWeight={active ? 'bold' : 'regular'} display={navSize == 'small' ? 'none' : 'flex'}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}


export default NavItem

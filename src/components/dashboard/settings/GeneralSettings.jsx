import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ExpenseCategoryPage from "../budget/expenseCategoryPage"
import Department from "../employee/Department"
import Designation from "../employee/Designation"
import OperationsPage from "../jobs/operations"

function GeneralSettings() {
  const [currentSettingPage, setCurrentSettingPage] = useState(null)
  const settings = [
    {
      name: "Employees",
      items: [
        {
          title: "department",
          component: <Department />,
        },
        {
          title: "designation",
          component: <Designation />,
        },
      ],
    },
    {
      name: "Jobs",
      items: [
        {
          title: "operations",
          component: <OperationsPage />,
        },
      ],
    },
    {
      name: "Expenses",
      items: [
        {
          title: "categories",
          component: <ExpenseCategoryPage />,
        },
      ],
    },
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  const handleSetURLParams = (param) => {
    setSearchParams({ setting: param })
  }

  useEffect(() => {
    const settingFromParams = searchParams.get("setting")
    if (settingFromParams) {
      const matchingItem = settings
        .flatMap((setting) => setting.items)
        .find((item) => item.title === settingFromParams)

      if (matchingItem) {
        setCurrentSettingPage(matchingItem.component)
      }
    }
  }, [searchParams])

  return (
    <Flex w={"100%"}>
      <List w={"20%"}>
        {settings &&
          settings.map((setting, i) => (
            <>
              <Box position="relative" padding="5">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  <Heading
                    fontWeight={"regular"}
                    color={"gray.500"}
                    size={"sm"}
                  >
                    {setting.name}
                  </Heading>
                </AbsoluteCenter>
              </Box>

              {setting.items &&
                setting.items.map((item, i) => (
                  <>
                    <ListItem
                      color={"gray.700"}
                      fontWeight={
                        searchParams.get("setting") === item.title
                          ? "semibold"
                          : ""
                      }
                      _hover={{ bg: "purple.200", cursor: "pointer" }}
                      bg={
                        searchParams.get("setting") === item.title
                          ? "purple.200"
                          : "white"
                      }
                      p={3}
                      px={5}
                      my={2}
                      rounded={"lg"}
                      onClick={() => {
                        setCurrentSettingPage((prev) => (prev = item.component))
                        handleSetURLParams(item.title)
                      }}
                      textTransform={"capitalize"}
                    >
                      {item.title}
                    </ListItem>
                  </>
                ))}
            </>
          ))}
      </List>

      <Box w={"80%"}>
        {currentSettingPage ? (
          currentSettingPage
        ) : (
          <>
            <Center h={"100%"}>
              <Box textAlign={"center"}>
                <Heading
                  fontSize={"5rem"}
                  fontWeight={"bolder"}
                  color={"gray.400"}
                >
                  Settings
                </Heading>
                <Text fontWeight={"regular"} color={"gray.700"}>
                  Choose a settings
                </Text>
              </Box>
            </Center>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default GeneralSettings

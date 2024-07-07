import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Button,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react"
import { useState } from "react"

function FilterMenu() {
  const [clients, setClients] = useState([])
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  const handleClientsChange = (values) => {
    setClients(values)
  }

  const handleDateChange = (event) => {
    setDateRange({ ...dateRange, [event.target.name]: event.target.value })
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Filter
      </MenuButton>
      <MenuList>
        <Container>
          <Heading size={"sm"} fontWeight={"semibold"}>
            Add Filters
          </Heading>
        </Container>
      </MenuList>
    </Menu>
  )
}

export default FilterMenu

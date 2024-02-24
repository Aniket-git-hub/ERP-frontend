import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";

function FilterMenu() {
    const [clients, setClients] = useState([]);
    const [dateRange, setDateRange] = useState({ from: "", to: "" });

    const handleClientsChange = (values) => {
        setClients(values);
    };

    const handleDateChange = (event) => {
        setDateRange({ ...dateRange, [event.target.name]: event.target.value });
    };

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Filter
            </MenuButton>
            <MenuList>
                <MenuItem isDisabled>
                    <FormControl>
                        <FormLabel>Clients</FormLabel>
                        <CheckboxGroup value={clients} onChange={handleClientsChange}>
                            <Checkbox value="Client 1">Client 1</Checkbox>
                            <Checkbox value="Client 2">Client 2</Checkbox>
                            <Checkbox value="Client 3">Client 3</Checkbox>
                            {/* Add more checkboxes as needed */}
                        </CheckboxGroup>
                    </FormControl>
                </MenuItem>
                <MenuItem>
                    <FormControl>
                        <FormLabel>Date Range</FormLabel>
                        <Box display="flex" justifyContent="space-between">
                            <Input type="date" name="from" value={dateRange.from} onChange={handleDateChange} />
                            <Input type="date" name="to" value={dateRange.to} onChange={handleDateChange} />
                        </Box>
                    </FormControl>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default FilterMenu;

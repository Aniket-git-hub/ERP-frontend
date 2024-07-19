import { Button, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

function SearchInput({ searchTerm, onChange, onSearch }) {
    return (
        <FormControl display={"flex"} gap={3} flex={3}>
            <InputGroup>
                <Input placeholder="Search" value={searchTerm} onChange={onChange} />
                <InputRightElement children={<FiSearch />} borderRadius="10px" />
            </InputGroup>
            <Button colorScheme="purple" onClick={onSearch}>Search</Button>
        </FormControl>
    );
}

export default SearchInput;

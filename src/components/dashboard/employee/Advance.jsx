import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { createAdvance } from "../../../api/endpoints/employee/advances"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { formatDate } from "../../../utils/utils"

function Advance() {
  const { advances, employeeOptions } = useData()
  const initialState = { date: "", amount: "", description: "", employeeId: "" }
  const submit = async (values) => {
    try {
      const response = await createAdvance(values.employeeId, values)
      return { title: "Create advance", message: response.data.message }
    } catch (error) {
      throw error
    }
  }
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormValidation(initialState, submit)
  return (
    <Box>
      <Flex w={"100%"} gap={10}>
        <Box
          flex={1}
          pt={5}
          pb={10}
          px={5}
          boxShadow={"0 2px 4px rgba(0, 0, 0, 0.2)"}
          borderRadius={"15px"}
        >
          <Heading mb={5} size={"md"} color={"gray.700"}>
            Create New Advance
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired isInvalid={errors.employeeId}>
              <FormLabel>Select Employee</FormLabel>
              <Select
                onChange={handleChange("employeeId")}
                options={employeeOptions}
                value={
                  employeeOptions.filter(
                    (eO) => eO.value === values.employeeId,
                  )[0]
                }
              />
              <FormErrorMessage>{errors.employeeId}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mt={2} isInvalid={errors.date}>
              <FormLabel>Date</FormLabel>
              <InputGroup>
                <Input
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange()}
                />
              </InputGroup>
              <FormErrorMessage>{errors.date}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mt={2} isInvalid={errors.amount}>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange()}
                  textAlign={"right"}
                />
                <InputRightAddon children={"Rs"} />
              </InputGroup>
              <FormErrorMessage>{errors.amount}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mt={2} isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <InputGroup>
                <Textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange()}
                />
              </InputGroup>
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
              <Button
                type="submit"
                w={"100%"}
                colorScheme="purple"
                isLoading={isSubmitting}
                loadingText="Creating..."
                isDisabled={isSubmitting}
              >
                Create Advance{" "}
              </Button>
            </FormControl>
          </form>
        </Box>
        <Box flex={3}>
          <Heading color={"gray.700"} size={"md"}>
            Advances
          </Heading>
          <TableContainer>
            <Table>
              <TableCaption>Advances</TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Date</Th>
                  <Th>Employee</Th>
                  <Th isNumeric>Amount</Th>
                  <Th isNumeric>Remaining Amount</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {advances &&
                  advances.length > 0 &&
                  advances.map((advance, index) => (
                    <Tr key={`${index}-${advance.date}`}>
                      <Td>{index + 1}</Td>
                      <Td>{formatDate(advance.date, "dd-mon-yyyy")}</Td>
                      <Td>{advance?.employee.name}</Td>
                      <Td isNumeric>{advance.amount}</Td>
                      <Td isNumeric>{advance.remainingAmount}</Td>
                      <Td>{advance.description}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Box>
  )
}

export default Advance

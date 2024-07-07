import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { formatDate } from "../../../utils/utils"

function Payment() {
  const { advances, employeeOptions } = useData()
  const modesOfPayment = [
    { value: "Online", label: "Online" },
    { value: "Cash", label: "Cash" },
  ]
  const initialState = {
    attendanceMonth: "",
    date: "",
    deductionAmount: "",
    remarks: "",
    employeeId: "",
    modeOfPayment: "",
  }
  const submit = async (values) => {
    try {
      // const response = await createAdvance(values.employeeId, values)
      console.log(values)
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
          pb={6}
          px={5}
          boxShadow={"0 2px 4px rgba(0, 0, 0, 0.2)"}
          borderRadius={"15px"}
        >
          <Heading mb={5} size={"md"} color={"gray.700"}>
            Make Payment
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
            <HStack>
              <FormControl isRequired mt={2} isInvalid={errors.attendanceMonth}>
                <FormLabel>For Month</FormLabel>
                <InputGroup>
                  <Input
                    type="month"
                    name="attendanceMonth"
                    value={values.attendanceMonth}
                    onChange={handleChange()}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.attendanceMonth}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired mt={2} isInvalid={errors.date}>
                <FormLabel>Date of Payment</FormLabel>
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
            </HStack>
            <HStack>
              s
              <FormControl isRequired mt={2} isInvalid={errors.modeOfPayment}>
                <FormLabel>Mode Of Payment</FormLabel>
                <Select
                  onChange={handleChange("modeOfPayment")}
                  options={modesOfPayment}
                  value={
                    modesOfPayment.filter(
                      (eO) => eO.value === values.modeOfPayment,
                    )[0]
                  }
                />
                <FormErrorMessage>{errors.modeOfPayment}</FormErrorMessage>
              </FormControl>
              <FormControl mt={2} isInvalid={errors.deductionAmount}>
                <FormLabel>Deduction</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    textAlign={"right"}
                    name="deductionAmount"
                    value={values.deductionAmount}
                    onChange={handleChange()}
                  />
                  <InputRightAddon children={"Rs"} />
                </InputGroup>
                <FormErrorMessage>{errors.deductionAmount}</FormErrorMessage>
              </FormControl>
            </HStack>
            <FormControl isRequired mt={2} isInvalid={errors.remarks}>
              <FormLabel>Remarks</FormLabel>
              <InputGroup>
                <Textarea
                  name="remarks"
                  value={values.remarks}
                  onChange={handleChange()}
                />
              </InputGroup>
              <FormErrorMessage>{errors.remarks}</FormErrorMessage>
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
                Make Payment{" "}
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

export default Payment

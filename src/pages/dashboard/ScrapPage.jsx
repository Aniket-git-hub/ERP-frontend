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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { addScrapSell } from "../../api/endpoints/work/scrapSellAPI"
import { useData } from "../../hooks/useData"
import { useFormValidation } from "../../hooks/useFormValidation"
import { formatDate } from "../../utils/utils"

function ScrapPage() {
  const { scrapSell } = useData()
  const initialState = { date: "", buyer: "", amount: "", rate: "", weight: "" }
  const submit = async (values) => {
    try {
      const response = await addScrapSell(values)

      return { title: "Add Scrap Sell", message: response.data.message }
    } catch (error) {
      throw error
    }
  }
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormValidation(initialState, submit)
  return (
    <Box p={5}>
      <Heading mb={5} size={"lg"} color={"gray.700"}>
        Scrap Sell
      </Heading>
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
            Add Scrap Sell
          </Heading>
          <form onSubmit={handleSubmit}>
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
            <FormControl isRequired mt={2} isInvalid={errors.buyer}>
              <FormLabel>Buyer</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="buyer"
                  value={values.buyer}
                  onChange={handleChange()}
                />
              </InputGroup>
              <FormErrorMessage>{errors.buyer}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mt={2} isInvalid={errors.rate}>
              <FormLabel>Rate</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  name="rate"
                  value={values.rate}
                  onChange={handleChange()}
                  textAlign={"right"}
                />
                <InputRightAddon children={"Rs"} />
              </InputGroup>
              <FormErrorMessage>{errors.rate}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mt={2} isInvalid={errors.weight}>
              <FormLabel>Weight</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  name="weight"
                  value={values.weight}
                  onChange={handleChange()}
                  textAlign={"right"}
                />
                <InputRightAddon children={"kg"} />
              </InputGroup>
              <FormErrorMessage>{errors.weight}</FormErrorMessage>
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
              <FormErrorMessage> {errors.amount}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
              <Button
                type="submit"
                w={"100%"}
                colorScheme="purple"
                isLoading={isSubmitting}
                loadingText="Adding..."
                isDisabled={isSubmitting}
              >
                Add Scrap Sell{" "}
              </Button>
            </FormControl>
          </form>
        </Box>
        <Box flex={3}>
          <Heading color={"gray.700"} size={"md"}>
            Scrap Sells
          </Heading>
          <TableContainer>
            <Table>
              <TableCaption>Scrap Sells</TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Date</Th>
                  <Th>Buyer</Th>
                  <Th isNumeric>Weight(kg)</Th>
                  <Th isNumeric>Rate(rs)</Th>
                  <Th isNumeric>Amount(RS)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {scrapSell &&
                  scrapSell.length > 0 &&
                  scrapSell.map((ss, index) => (
                    <Tr key={`${index}-${ss.date}`}>
                      <Td>{index + 1}</Td>
                      <Td>{formatDate(ss.date, "dd-mon-yyyy")}</Td>
                      <Td>{ss?.buyer}</Td>
                      <Td isNumeric>{ss.weight}</Td>
                      <Td isNumeric>{ss.rate}</Td>
                      <Td isNumeric>{ss.amount}</Td>
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

export default ScrapPage

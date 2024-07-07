import { Box, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getInvoiceById } from "../../../api/endpoints/work/invoices"

function InvoiceById() {
  const { invoiceId } = useParams()
  const [invoice, setInvoice] = useState(null)
  useEffect(() => {
    const load = async () => {
      const response = await getInvoiceById(invoiceId)
      setInvoice(response.data.invoice)
    }
    load()
  }, [invoiceId])

  return (
    <Box p={5}>
      <Heading size={"md"} mb={3} fontWeight={"semibold"}>
        Invoice - {invoiceId}
      </Heading>
      <Flex w={"100%"}>
        {invoice && (
          <VStack flex={1} boxShadow={"lg"} p={5} rounded={"lg"}>
            <HStack w={"100%"} fontWeight={"600"} color={"purple.800"}>
              <Text>{invoice?.invoiceType.toUpperCase()} Invoice </Text>
            </HStack>
            <HStack w={"100%"}>
              <Text fontWeight={"600"}>Client: </Text>
              <Text>{invoice?.client.name} </Text>
            </HStack>
            <HStack w={"100%"}>
              <Text fontWeight={"600"}>Date: </Text>
              <Text>{new Date(invoice?.invoiceDate).toDateString()}</Text>
            </HStack>
            <HStack w={"100%"}>
              <Text fontWeight={"600"}>Total Quantity: </Text>
              <Text>{invoice?.totalQuantity} </Text>
            </HStack>
            <HStack w={"100%"}>
              <Text fontWeight={"600"}>
                {invoice.invoiceType == "taxed" ? "Amount:" : "Total Amount:"}{" "}
              </Text>
              <Text>{invoice?.totalAmountBeforeTax} </Text>
            </HStack>

            <HStack
              w={"100%"}
              hidden={invoice.invoiceType == "taxed" ? false : true}
            >
              <Text fontWeight={"600"}>CGST {invoice?.cGstPercentage}% : </Text>
              <Text>{invoice?.cGstAmount} </Text>
            </HStack>
            <HStack
              w={"100%"}
              hidden={invoice.invoiceType == "taxed" ? false : true}
            >
              <Text fontWeight={"600"}>SGST {invoice?.sGstPercentage}% : </Text>
              <Text>{invoice?.sGstAmount} </Text>
            </HStack>
            <HStack
              w={"100%"}
              hidden={invoice.invoiceType == "taxed" ? false : true}
            >
              <Text fontWeight={"600"}>IGST {invoice?.iGstPercentage}% : </Text>
              <Text>{invoice?.iGstAmount} </Text>
            </HStack>
            <HStack
              w={"100%"}
              hidden={invoice.invoiceType == "taxed" ? false : true}
            >
              <Text fontWeight={"600"}>Total Amount: </Text>
              <Text>{invoice?.totalAmountAfterTax} </Text>
            </HStack>
            <HStack w={"100%"}>
              <Text fontWeight={"600"}>Note: </Text>
              <Text>{invoice?.notes ? invoice.notes : "-"} </Text>
            </HStack>
            {/* <Button
                        hidden={invoice.paymentReceived}
                        w={"100%"}
                        my={2}
                        colorScheme={"purple"}>
                        Mark Payment Received
                    </Button> */}
          </VStack>
        )}

        <Flex flex={3}></Flex>
      </Flex>
    </Box>
  )
}

export default InvoiceById

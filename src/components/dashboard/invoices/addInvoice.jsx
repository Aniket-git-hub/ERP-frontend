import { Button, ButtonGroup, Center, Checkbox, Container, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, InputGroup, InputRightAddon, Textarea, VStack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useEffect, useState } from "react"
import { createInvoice, getJobs } from "../../../api/data"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { getMonthRange } from "../../../utils/utils"

function AddInvoice() {
    const initialState = { clientId: -1, invoiceDate: '', cGst: '', iGst: '', sGst: '', notes: '', totalQuantity: '', totalAmount: '', isPaid: 1 }
    const { clientOptions } = useData()
    const [taxed, setTaxed] = useState(false)

    const submit = async (values) => {
        try {
            const response = await createInvoice({
                ...values,
                // jobIds: selectedItems,
                invoiceType: taxed ? 'taxed' : 'simple',
            })
            return { title: "Add Invoice", message: response.data.message }
        } catch (error) {
            throw error
        }
    }

    const { values, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, submit)

    const [invoiceJobs, setInvoiceJobs] = useState(null)

    const loadJobs = async (page, limit, filters) => {
        try {
            const response = await getJobs({
                page,
                limit,
                filters
            })
            setInvoiceJobs(response.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        if (values.clientId !== '' && values.invoiceDate !== '') {
            let monthRage = getMonthRange(values.invoiceDate)
            loadJobs(1, null, {
                fromDate: monthRage.firstDay,
                toDate: monthRage.lastDay,
                InvoiceId: '',
                ClientId: values.clientId
            })
        }
    }, [values.clientId, values.invoiceDate])

    const [selectedItems, setSelectedItems] = useState([]);

    return (
        <Container boxShadow={'0px 3px 15px rgba(0,0,0,0.2)'} p={8} rounded={"lg"}>
            <form onSubmit={handleSubmit}>
                <Heading size={"md"} mb={4}>Add Invoice</Heading>

                <ButtonGroup variant={"outline"} isAttached w={"100%"} mt={2} mb={3}>
                    <Button w={"100%"} colorScheme={taxed ? "purple" : "gray"} variant={taxed ? 'solid' : 'outline'} onClick={() => setTaxed(true)}>Tax</Button>
                    <Button w={"100%"} colorScheme={!taxed ? "purple" : "gray"} variant={!taxed ? 'solid' : 'outline'} onClick={() => setTaxed(false)}>Simple</Button>
                </ButtonGroup>

                <HStack>
                    <FormControl isInvalid={errors.clientId} isRequired mb=".8rem">
                        <FormLabel>Select Client</FormLabel>
                        <Select
                            onChange={handleChange('clientId')}
                            colorScheme="purple"
                            tagVariant={"solid"}
                            options={clientOptions}
                            value={clientOptions.filter((c) => c.value === values.clientId)[0]}
                        />
                        <FormErrorMessage>
                            {errors.clientId}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.invoiceDate} isRequired mb=".8rem">
                        <FormLabel>Invoice Date</FormLabel>
                        <Input type='date' name="invoiceDate" value={values.invoiceDate} onChange={handleChange()} />
                        <FormErrorMessage>{errors.invoiceDate}</FormErrorMessage>
                    </FormControl>
                </HStack>

                <HStack >
                    <FormControl isInvalid={errors.totalQuantity} isRequired mb=".8rem">
                        <FormLabel>Total Quantity</FormLabel>
                        <InputGroup>
                            <Input type='number' name="totalQuantity" textAlign={"right"} value={values.totalQuantity} onChange={handleChange()} />
                            <InputRightAddon children={"Nos"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.totalQuantity}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.totalAmount} isRequired mb=".8rem">
                        <FormLabel>Total Amount</FormLabel>
                        <InputGroup>
                            <Input type="number" name="totalAmount" textAlign={"right"} value={values.totalAmount} onChange={handleChange()} />
                            <InputRightAddon children={"Rs"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.totalAmount}</FormErrorMessage>
                    </FormControl>
                </HStack>

                <HStack hidden={!taxed}>
                    <FormControl isInvalid={errors.cGst} isRequired={taxed} mb=".8rem">
                        <FormLabel>CGST</FormLabel>
                        <InputGroup>
                            <Input type='number' name="cGst" textAlign={"right"} value={values.cGst} onChange={handleChange()} />
                            <InputRightAddon children={"%"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.cGst}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.sGst} isRequired={taxed} mb=".8rem">
                        <FormLabel>SGST</FormLabel>
                        <InputGroup>
                            <Input type="number" name="sGst" textAlign={"right"} value={values.sGst} onChange={handleChange()} />
                            <InputRightAddon children={"%"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.sGst}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.iGst} mb=".8rem">
                        <FormLabel>IGST</FormLabel>
                        <InputGroup>
                            <Input type="number" name="iGst" textAlign={"right"} value={values.iGst} onChange={handleChange()} />
                            <InputRightAddon children={"%"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.iGst}</FormErrorMessage>
                    </FormControl>
                </HStack>

                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Payment done?
                    </FormLabel>
                    <Checkbox id='email-alerts' mr={2} name="isPaid" value={values.isPaid == -1 ? false : true} onChange={handleChange()} />
                </FormControl>

                <FormControl isInvalid={errors.notes} mb=".8rem">
                    <FormLabel>Notes</FormLabel>
                    <Textarea name="notes" value={values.notes} onChange={handleChange()} />
                    <FormErrorMessage>{errors.notes}</FormErrorMessage>
                </FormControl>

                <Center w={"full"}>
                    <VStack w={"full"}>
                        <Button type="submit" w={"full"} m={5} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." disabled={isSubmitting}>
                            Add Invoice
                        </Button>
                    </VStack>
                </Center>
            </form>

        </Container>
    )
}

export default AddInvoice

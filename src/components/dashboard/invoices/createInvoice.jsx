import { Button, Center, Checkbox, Container, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useEffect, useState } from "react"
import { createInvoice, getJobs } from "../../../api/data"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { getMonthRange } from "../../../utils/utils"

function CreateInvoice() {
    const initialState = { clientId: -1, invoiceDate: '', cGst: '', iGst: '', sGst: '', notes: '' }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { jobs, clientOptions, materials } = useData()

    const submit = async (values) => {
        try {
            const response = await createInvoice({
                ...values,
                jobIds: selectedItems,
            })

            return { title: "Create Invoice", message: response.data.message }
        } catch (error) {
            console.log(error)
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

    const handleCheckboxChange = (itemId, rate) => {
        const isSelected = selectedItems.includes(itemId);
        if (rate !== 0) {
            if (isSelected) {
                setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== itemId));
            } else {
                setSelectedItems((prevSelected) => [...prevSelected, itemId]);
            }
        }
    };

    const handleSelectAll = () => {
        if (!invoiceJobs) {
            return
        }
        const allSelected = selectedItems.length === invoiceJobs.items.length;
        if (allSelected) {
            setSelectedItems([]);
        } else {
            const allItemIds = invoiceJobs.items.filter((item) => item.rate !== 0).map((item) => item.id);
            setSelectedItems(allItemIds);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>

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

                <FormControl isInvalid={selectedItems.length < 1} isRequired mb=".8rem">
                    <FormLabel>Select Jobs</FormLabel>
                    <Button variant={'outline'} onClick={() => onOpen()}>Select Jobs</Button>
                    <FormErrorMessage>No jobs selected</FormErrorMessage>
                </FormControl>

                <HStack>
                    <FormControl isInvalid={errors.cGst} isRequired mb=".8rem">
                        <FormLabel>CGST</FormLabel>
                        <InputGroup>
                            <Input type='number' name="cGst" textAlign={"right"} value={values.cGst} onChange={handleChange()} />
                            <InputRightAddon children={"%"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.cGst}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.sGst} isRequired mb=".8rem">
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

                <FormControl isInvalid={errors.notes} mb=".8rem">
                    <FormLabel>Notes</FormLabel>
                    <Textarea name="notes" value={values.notes} onChange={handleChange()} />
                    <FormErrorMessage>{errors.notes}</FormErrorMessage>
                </FormControl>

                <Center w={"full"}>
                    <VStack w={"full"}>
                        <Button type="submit" w={"full"} m={5} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." disabled={isSubmitting}>
                            Create Invoice
                        </Button>
                    </VStack>
                </Center>
            </form>
            <Modal isCentered isOpen={isOpen} onClose={onClose} py={5} scrollBehavior="inside">
                {/* <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                /> */}
                <ModalContent>
                    <ModalHeader >
                        <Heading size={'md'}>Select Jobs</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer>
                            <Table variant={"simple"} size={'sm'}>
                                <Thead >
                                    <Tr>
                                        <Th whiteSpace="normal" p={3}>
                                            <Checkbox
                                                isDisabled={invoiceJobs && invoiceJobs.items.every((item) => item.rate === 0)}
                                                isChecked={invoiceJobs && selectedItems.length === invoiceJobs.items.length}
                                                onChange={handleSelectAll}
                                            />
                                        </Th>
                                        <Th whiteSpace="normal" p={3}>Drawing Number</Th>
                                        <Th whiteSpace="normal" isNumeric p={3}>Qty</Th>
                                        <Th whiteSpace="normal" isNumeric p={3}>Rate</Th>
                                        <Th whiteSpace="normal" isNumeric p={3}>Total</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        (invoiceJobs && invoiceJobs.items.length > 0) ? invoiceJobs.items.map((job, i) => (
                                            <Tr key={i}>
                                                <Td whiteSpace="normal" p={3} textAlign={'center'}>
                                                    <Checkbox
                                                        isChecked={selectedItems.includes(job.id)}
                                                        onChange={() => handleCheckboxChange(job.id, job.rate)}
                                                        isDisabled={job.rate === 0}
                                                    />
                                                </Td>
                                                <Td whiteSpace="normal" p={3}>{job.drawingNumber}</Td>
                                                <Td whiteSpace="normal" isNumeric p={3}>{job.qty}</Td>
                                                <Td whiteSpace="normal" isNumeric p={3}>{job.rate}</Td>
                                                <Td whiteSpace="normal" isNumeric p={3}>{job.rate * job.qty}</Td>
                                            </Tr>
                                        ))
                                            :
                                            <Tr >
                                                <Td textAlign={"center"} colSpan="6">
                                                    <Text>No Data</Text>
                                                </Td>
                                            </Tr>
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="purple" onClick={() => onClose()}>Create Invoice</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default CreateInvoice
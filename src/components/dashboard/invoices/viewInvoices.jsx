import { Box, Button, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { getInvoicePDF, getJobsByIds } from "../../../api/data";
import { useData } from "../../../hooks/useData";

function ViewInvoices() {
    const { invoices, invoiceJob, setInvoiceJobs } = useData()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedInvoice, setSelectedInvoice] = useState(-1)
    const toast = useToast()

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', { dateStyle: "medium" }).format(new Date(date));
    };
    const handleViewJobsOnClick = async (jobsIds, invoiceNumber) => {
        setSelectedInvoice(invoiceNumber)
        try {
            const response = await getJobsByIds(jobsIds)
            console.log(response)
            setInvoiceJobs(response.data.jobs)
            onOpen()
            // console.log(invoiceJob)
        } catch (e) {
            console.log(e)
        }
    }

    const handleGetPDF = async (invoiceId) => {
        try {
            const response = await getInvoicePDF(invoiceId);

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "invoice.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: 'Invoice PDF',
                description: response?.data?.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'Failed to download PDF',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            });
        }
    }

    return (
        <Box p={4} >
            <TableContainer>
                <Table variant={"simple"} size={'sm'} >
                    <TableCaption>Invoices</TableCaption>
                    <Thead >
                        <Tr>
                            <Th whiteSpace="normal" p={3}>Sr.No</Th>
                            <Th whiteSpace="normal" p={3}>Invoice No</Th>
                            <Th p={3}>Date</Th>
                            <Th p={3}>Invoice To</Th>
                            <Th p={3} isNumeric>Total Qty</Th>
                            <Th p={3} isNumeric>Amount</Th>
                            <Th p={3} isNumeric>CGST - %</Th>
                            <Th p={3} isNumeric>IGST - %</Th>
                            <Th p={3} isNumeric>SGST - %</Th>
                            <Th p={3} isNumeric>Total Amount</Th>
                            <Th whiteSpace="normal" p={3}>Notes</Th>
                            <Th p={3}>Jobs</Th>
                            <Th p={3}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            invoices.length > 0 && invoices.map((invoice, i) => (
                                <Tr py={0} px={3} key={invoice.invoiceNumber}>
                                    <Td py={0} px={3} >{i + 1}</Td>
                                    <Td py={0} px={3} >{invoice.invoiceNumber}</Td>
                                    <Td py={0} px={3} >{formatDate(invoice.invoiceDate)}</Td>
                                    <Td py={0} px={3} >{invoice?.Client.name}</Td>
                                    <Td py={0} px={3} isNumeric >{invoice.totalQuantity}</Td>
                                    <Td py={0} px={3} isNumeric >{invoice.totalAmountBeforeTax}</Td>
                                    <Td py={0} px={3} isNumeric >{invoice.cGstAmount + "-" + invoice.cGstPercentage + "%"}</Td>
                                    <Td py={0} px={3} isNumeric >{invoice.iGstAmount + "-" + invoice.iGstPercentage + "%"}</Td>
                                    <Td py={0} px={3} isNumeric >{invoice.sGstAmount + "-" + invoice.sGstPercentage + "%"}</Td>
                                    <Td py={0} px={3} isNumeric >{invoice.totalAmountAfterTax}</Td>
                                    <Td whiteSpace="normal" py={0} px={3}>{invoice.notes || '-'}</Td>
                                    <Td py={2} px={3}>
                                        <Button size={'sm'} onClick={() => handleViewJobsOnClick(invoice.Jobs, invoice.invoiceNumber)}>view</Button>
                                    </Td>
                                    <Td py={2} px={3} textAlign={'center'}>
                                        <IconButton size={'sm'} icon={<FaRegFilePdf />} onClick={() => { handleGetPDF(invoice.id) }} />
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading fontSize={"medium"} color={"gray-800"}>For Invoice Number #{selectedInvoice}</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer>
                            <Table variant={"simple"} size={'sm'}>
                                <Thead >
                                    <Tr>
                                        <Th whiteSpace="normal" p={3}>Sr.No</Th>
                                        <Th whiteSpace="normal" p={3}>Drawing Number</Th>
                                        <Th whiteSpace="normal" p={3}>Qty</Th>
                                        <Th whiteSpace="normal" p={3}>Rate</Th>
                                        <Th whiteSpace="normal" p={3}>Total</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        invoiceJob.length > 0 && invoiceJob.map((job, i) => (
                                            <Tr key={i}>
                                                <Td whiteSpace="normal" p={3}>{i + 1}</Td>
                                                <Td whiteSpace="normal" p={3}>{job.drawingNumber}</Td>
                                                <Td whiteSpace="normal" p={3}>{job.quantity}</Td>
                                                <Td whiteSpace="normal" p={3}>{job.rate}</Td>
                                                <Td whiteSpace="normal" p={3}>{job.rate * job.quantity}</Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ViewInvoices

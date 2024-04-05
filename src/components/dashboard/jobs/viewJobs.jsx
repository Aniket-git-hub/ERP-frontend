
import { EditIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Center, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Textarea, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import {
    Select
} from "chakra-react-select";
import { useEffect, useState } from "react";
import { deleteJob, getJobs, updateJob } from "../../../api/data";
import { useData } from "../../../hooks/useData";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { getUpdatableValue } from "../../../utils/utils";
import CustomAlertDialog from "../../utils/AlertDialog";
import DataTable from '../../utils/DataTable';

function ViewJobs() {

    const { jobs: { items, ...paginationData }, setJobs, clients, materials, materialOptions, clientOptions } = useData();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const flattenedJobs = (item) => {
        if (!item || (item && item.length < 1)) return []
        return item.map(job => {
            const flattenedJob = { ...job };
            if (job.client && typeof job.client === 'object') {
                flattenedJob.client = job.client.name;
            }
            if (job.material && typeof job.material === 'object') {
                flattenedJob.material = job.material.name;
            }
            if (job.operation_costs && Array.isArray(job.operation_costs) && job.operation_costs.length > 0) {
                flattenedJob["rate"] = job.operation_costs.reduce((acc, curr) => acc + parseInt(curr.cost), 0);
            }
            return flattenedJob;
        })
    }


    const loadData = async (page, limit = 10) => {
        try {
            const response = await getJobs({ page, limit })
            setJobs(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageChange = (page, limit) => {
        loadData(page, limit)
    }

    const columns = [
        { label: 'Drawing Number', name: 'drawingNumber' },
        { label: 'Date', name: 'date', isDate: true },
        { label: 'Client', name: 'client' },
        { label: 'Description', name: 'description' },
        { label: 'Size', name: 'size' },
        { label: 'Material', name: 'material' },
        { label: 'Billed', name: 'invoiceId', isBoolean: true },
        { label: 'Qty', name: 'qty', isNumeric: true },
        { label: 'Rate', name: 'rate', isNumeric: true },
        { label: 'Total', name: 'total', isNumeric: true },
    ];

    const [selectedItem, setSelectedItem] = useState(null)
    const handleActionClick = (item) => {
        onOpen()
        setSelectedItem(item)
    }

    const submit = async (values) => {
        onClose()
        delete values.Client
        delete values.Material
        try {

            const { clientId, materialId, ...otherData } = values;
            const updatableData = getUpdatableValue(otherData, selectedItem);
            if (clientId) {
                updatableData.clientId = clientId;
            }
            if (materialId) {
                updatableData.materialId = materialId
            }
            if (Object.keys(updatableData).length > 0) {
                const response = await updateJob(selectedItem.id, updatableData);
                return { title: "Update job", message: response.data.message };
            } else {
                return { title: "No Update Needed", message: "No properties to update." };
            }
        } catch (error) {
            throw error;
        }
    };


    const initialState = { drawingNumber: '', quantity: '', rate: '', clientId: '', materialId: '', date: '', size: '', description: '' }
    const { values, setValues, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, submit)

    useEffect(() => {
        if (selectedItem) {
            setValues(prev => ({
                ...prev,
                drawingNumber: selectedItem.drawingNumber,
                quantity: selectedItem.qty,
                Client: selectedItem.Client,
                Material: selectedItem.Material,
                rate: selectedItem.rate,
                description: selectedItem.description,
                size: selectedItem.size,
                date: selectedItem.date
            }))
        }

    }, [selectedItem])

    const [deleting, setDeleting] = useState(false)

    const handleDeleteJobRequest = async (id) => {
        try {
            setDeleting(true)
            const response = await deleteJob(id)
            toast({
                title: 'Delete Job',
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } catch (error) {
            toast({
                title: 'Delete Job',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } finally {
            setDeleting(false)
            onClose()
        }
    }

    const findOptions = (options, value, label) => {
        const optionByOne = options.find(option => option.value === value)
        const optionByTwo = options.find(option => option.label === label)

        return optionByOne || optionByTwo || null
    }

    return (
        <>
            <DataTable
                data={flattenedJobs(items)}
                columns={columns}
                paginationData={paginationData}
                changePage={handlePageChange}
                changeLimit={handlePageChange}
                actionButton={true}
                actionIcon={<EditIcon />}
                actionProperty={"id"}
                onActionButtonClick={handleActionClick}
            />

            {selectedItem &&
                <Modal
                    isOpen={isOpen}
                    onClose={() => { setSelectedItem(null); onClose() }}
                    motionPreset='slideInRight'
                    size={"xl"}
                    isCentered
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <Heading size={"md"} my={3}>Edit Drawing # {selectedItem.id}</Heading>
                                <Alert status='error' variant='left-accent' hidden={!selectedItem.InvoiceId}>
                                    <AlertIcon />
                                    Can't Update Billed Jobs - invoiceId #{selectedItem.InvoiceId}
                                </Alert>
                                <FormControl isInvalid={errors.drawingNumber} isRequired mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                    <FormLabel>Drawing Number</FormLabel>
                                    <Input type='text' name="drawingNumber" value={values.drawingNumber} autoFocus={true} onChange={handleChange()} />
                                    <FormErrorMessage>{errors.drawingNumber}</FormErrorMessage>
                                </FormControl>

                                <HStack>
                                    <FormControl isInvalid={errors.quantity} isRequired mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                        <FormLabel>Quantity</FormLabel>
                                        <InputGroup>
                                            <Input type='number' name="quantity" value={values.quantity} textAlign={"right"} onChange={handleChange()} />
                                            <InputRightAddon children="Nos" />
                                        </InputGroup>
                                        <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.rate} mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                        <FormLabel>Rate</FormLabel>
                                        <InputGroup>
                                            <Input type='number' name="rate" value={values.rate} textAlign={"right"} onChange={handleChange()} />
                                            <InputRightAddon children="Rs" />
                                        </InputGroup>
                                        <FormErrorMessage>{errors.rate}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.date} isRequired mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                        <FormLabel>Date</FormLabel>
                                        <Input type='date' name="date" value={values.date.split("T")[0]} onChange={handleChange()} />
                                        <FormErrorMessage>{errors.date}</FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <HStack>
                                    <FormControl isRequired mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                        <FormLabel>Select Client</FormLabel>
                                        <Select
                                            colorScheme="purple"
                                            tagVariant={"solid"}
                                            options={clientOptions || []}
                                            value={
                                                findOptions(clientOptions, values.clientId, selectedItem.Client)
                                            }
                                            onChange={handleChange('clientId')}
                                        />
                                        <FormErrorMessage>
                                            {errors.clientId}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                        <FormLabel>Select Materials</FormLabel>
                                        <Select
                                            colorScheme="purple"
                                            tagVariant={"solid"}
                                            options={materialOptions || []}
                                            value={
                                                findOptions(materialOptions, values.materialId, selectedItem.Material)
                                            }
                                            onChange={handleChange("materialId")}
                                        />
                                        <FormErrorMessage>
                                            {errors.materialId}
                                        </FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <FormControl isInvalid={errors.size} mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                    <FormLabel>Size</FormLabel>
                                    <Input type='text' name="size" value={values.size} onChange={handleChange()} />
                                    <FormErrorMessage>{errors.size}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.description} mb=".8rem" isDisabled={selectedItem.InvoiceId !== null}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea name="description" value={values.description} onChange={handleChange()} />
                                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                                </FormControl>

                                <Center w={"full"}>
                                    <VStack w={"full"}>
                                        <Button w={"full"} type="submit" mb={2} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." isDisabled={isSubmitting || selectedItem.InvoiceId !== null}>
                                            Save Job
                                        </Button>
                                    </VStack>
                                </Center>
                            </form>

                            <Center w={"full"}>
                                <VStack w={"full"}>
                                    <CustomAlertDialog
                                        button={(onOpen) => (
                                            <Button
                                                w={"full"}
                                                mb={4}
                                                colorScheme='red'
                                                onClick={() => onOpen()}
                                            > Delete Job</Button>
                                        )}
                                        alertTitle={"Delete Job"}
                                        alertText={"Are you sure you want to delete this job"}
                                        confirmButtonText={"Delete"}
                                        confirmButtonStatus={deleting}
                                        confirmMethod={async (onClose) => {
                                            await handleDeleteJobRequest(selectedItem.id)
                                            onClose()
                                        }}
                                    />
                                </VStack>
                            </Center>
                        </ModalBody>
                    </ModalContent>
                </Modal >
            }
        </>

    );
}

export default ViewJobs;

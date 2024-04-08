import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalContent, ModalOverlay, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { getUpdatableValue } from "../../../utils/utils";
import CustomAlertDialog from "../../utils/AlertDialog";
import DataTable from "../../utils/DataTable";

function ViewEmployees() {
    const { employees } = useData()
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const flattenedEmployee = (item) => {
        if (!item || (item && item.length < 1)) return []
        return item.map(i => {
            const flattenedItem = { ...i };
            if (i.designation && typeof i.designation === 'object') {
                flattenedItem.designation = i.designation.name;
            }
            if (i.department && typeof i.department === 'object') {
                flattenedItem.department = i.department.name;
            }
            return flattenedItem;
        })
    }

    const employeeColumns = [
        { label: "First Name", name: "firstName" },
        { label: "Last Name", name: "lastName" },
        { label: "Email", name: "email" },
        { label: "Mobile", name: "mobileNumber" },
        { label: "Address", name: "address" },
        { label: "Salary", name: "salary", isNumeric: true },
        { label: "Designation", name: "designation" },
        { label: "Department", name: "department" },
        { label: "Date Of Joining", name: "dateOfJoining", isDate: true, },
    ]

    const [selectedItem, setSelectedItem] = useState(null)
    const handleActionClick = (item) => {
        setSelectedItem(item)
        onOpen()
    }
    useEffect(() => {
        if (selectedItem) {
            setValues(prev => ({
                ...prev,
                firstName: selectedItem.firstName,
                lastName: selectedItem.lastName,
                email: selectedItem.email,
                mobileNumber: selectedItem.mobileNumber,
                address: selectedItem.address,
                salary: selectedItem.salary,
                designation: selectedItem.designation,
                department: selectedItem.department,
                dateOfJoining: selectedItem.dateOfJoining,

            }))
        }
    }, [selectedItem])

    const submit = async (values) => {
        onClose()
        try {
            const updatableData = getUpdatableValue(values, selectedItem)
            if (Object.keys(updatableData).length > 0) {
                const response = await updateMaterial(selectedItem.id, values)
                return { title: "Update Material", message: response.data.message }
            }
        } catch (error) {
            throw error
        }
    }

    const initialState = { firstName: '', lastName: '', email: '', mobileNumber: '', address: '', department: '', designation: '', salary: '', dateOfJoining: '' }
    const { values, setValues, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, submit)
    const [deleting, setDeleting] = useState(false)

    const handleDeleteMaterial = async (materialId) => {
        try {
            setDeleting(true)
            const response = await deleteMaterial(materialId)
            toast({
                title: 'Delete Client',
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
        }
    }

    return (
        <>
            <Box p={4}>

                <DataTable
                    data={flattenedEmployee(employees)}
                    columns={employeeColumns}
                    actionButton={true}
                    actionIcon={<EditIcon />}
                    actionProperty={"id"}
                    onActionButtonClick={handleActionClick}
                />

            </Box>
            {
                selectedItem &&
                <Modal
                    isOpen={isOpen}
                    onClose={() => { setSelectedItem(null); onClose() }}
                    motionPreset="slideInRight"
                    isCentered
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody>
                            <Heading size={"md"} my={3}>
                                Edit Material # {selectedItem.id}
                            </Heading>

                            <form onSubmit={handleSubmit}>
                                <FormControl isInvalid={errors.firstName} isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" name="firstName" value={values.firstName} onChange={handleChange()} />
                                    <FormErrorMessage>
                                        {errors.firstName}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.lastName} isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" name="lastName" value={values.lastName} onChange={handleChange()} />
                                    <FormErrorMessage>
                                        {errors.lastName}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.email} isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" value={values.email} onChange={handleChange()} />
                                    <FormErrorMessage>
                                        {errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.mobileNumber} isRequired>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <Input type="number" name="mobileNumber" value={values.mobileNumber} onChange={handleChange()} />
                                    <FormErrorMessage>
                                        {errors.mobileNumber}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.address} isRequired>
                                    <FormLabel>Address</FormLabel>
                                    <Input type="text" name="address" value={values.address} onChange={handleChange()} />
                                    <FormErrorMessage>
                                        {errors.address}
                                    </FormErrorMessage>
                                </FormControl>


                                <Center w={"full"}>
                                    <VStack w={"full"}>
                                        <Button w={"full"} type="submit" mt={5} mb={2} colorScheme='purple' isLoading={isSubmitting} loadingText="Updating..." isDisabled={isSubmitting}>
                                            Update Employee
                                        </Button>
                                    </VStack>
                                </Center>
                            </form>

                            <Center w={"full"}>
                                <VStack w={"full"}>
                                    <CustomAlertDialog
                                        w={"full"}
                                        mb={4}
                                        colorScheme='red'
                                        buttonText={"Delete Employee"}
                                        alertTitle={"Delete Employee"}
                                        alertText={"Are you sure you want to delete this employee?"}
                                        confirmButtonText={"Delete"}
                                        confirmButtonStatus={deleting}
                                        confirmMethod={async (onClose) => {
                                            await handleDeleteMaterial(selectedItem.id)
                                            onClose()
                                        }}
                                    />
                                </VStack>
                            </Center>
                        </ModalBody>
                    </ModalContent>

                </Modal>
            }
        </>
    )
}

export default ViewEmployees

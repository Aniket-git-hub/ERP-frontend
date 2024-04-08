import { EditIcon } from "@chakra-ui/icons";
import { Button, Center, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalContent, ModalOverlay, Textarea, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteClient, updateClient } from "../../../api/endpoints/work/clients";
import { useData } from "../../../hooks/useData";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { getUpdatableValue } from "../../../utils/utils";
import CustomAlertDialog from "../../utils/AlertDialog";
import DataTable from "../../utils/DataTable";

function ViewClients() {
    const { clients } = useData()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const columns = [
        { label: "Client Name", name: "name" },
        { label: "Email", name: "email" },
        { label: "Phone", name: "phone" },
        { label: "GSTIN No", name: "gst" },
        { label: "Address", name: "address" },
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
                name: selectedItem.name,
                email: selectedItem.email,
                phone: selectedItem.phone,
                gst: selectedItem.gst,
                address: selectedItem.address
            }))
        }
    }, [selectedItem])
    const initialState = { name: "", address: "", phone: "", gst: "", email: "" }

    const submit = async (values) => {
        onClose()
        try {
            const updatableData = getUpdatableValue(values, selectedItem)
            console.log(updatableData)
            if (Object.keys(updatableData).length > 0) {
                const response = await updateClient(selectedItem.id, updatableData)
                return { title: 'Update client', message: response.data.message }
            }
        } catch (error) {
            throw error
        }
    }
    const { values, setValues, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, submit)

    const [deleting, setDeleting] = useState(false)
    const handleDeleteClient = async (clientId) => {
        try {
            setDeleting(true)
            const response = await deleteClient(clientId)
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
            <DataTable
                data={clients}
                columns={columns}
                actionButton={true}
                actionIcon={<EditIcon />}
                actionProperty={"id"}
                onActionButtonClick={handleActionClick}
            />
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
                                Edit Client # {selectedItem.id}
                            </Heading>
                            <form onSubmit={handleSubmit}>
                                <FormControl mb=".8rem">
                                    <FormLabel>Name</FormLabel>
                                    <Input type='text' name="name" value={values.name} autoFocus={true} onChange={handleChange()} />
                                </FormControl>
                                <FormControl mb=".8rem">
                                    <FormLabel>Email</FormLabel>
                                    <Input type='email' name="email" value={values.email} autoFocus={true} onChange={handleChange()} />
                                </FormControl>
                                <FormControl mb=".8rem">
                                    <FormLabel>Phone</FormLabel>
                                    <Input type='text' name="phone" value={values.phone} autoFocus={true} onChange={handleChange()} />
                                </FormControl>
                                <FormControl mb=".8rem">
                                    <FormLabel>GST</FormLabel>
                                    <Input type='text' name="gst" value={values.gst.toUpperCase()} autoFocus={true} onChange={handleChange()} />
                                </FormControl>
                                <FormControl mb="1.4rem">
                                    <FormLabel>Address</FormLabel>
                                    <Textarea rows={3} type='text' name="address" value={values.address} autoFocus={true} onChange={handleChange()} ></Textarea>
                                </FormControl>
                                <Center w={"full"}>
                                    <VStack w={"full"}>
                                        <Button w={"full"} type="submit" mb={2} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." isDisabled={isSubmitting}>
                                            Save Client
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
                                        alertTitle={"Delete Client"}
                                        alertText={"Are you sure you want to delete this client"}
                                        confirmButtonText={"Delete"}
                                        confirmButtonStatus={deleting}
                                        confirmMethod={async (onClose) => {
                                            await handleDeleteClient(selectedItem.id)
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

export default ViewClients

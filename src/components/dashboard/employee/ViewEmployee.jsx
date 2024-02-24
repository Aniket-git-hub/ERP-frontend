import { EditIcon } from "@chakra-ui/icons";
import { Button, Center, Container, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalContent, ModalOverlay, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteMaterial, updateMaterial } from "../../../api/data";
import { useData } from "../../../hooks/useData";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { getUpdatableValue } from "../../../utils/utils";
import CustomAlertDialog from "../../utils/AlertDialog";
import DataTable from "../../utils/DataTable";

function ViewEmployees() {
    const { materials } = useData()
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const columns = [
        { label: "Material Name", name: "name" },
        { label: "Density", name: "density" },
        { label: "Hardness", name: "hardness" },
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
                density: selectedItem.density,
                hardness: selectedItem.hardness
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
    const initialState = { name: "", density: "", hardness: "" }
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
            <Container p={4} boxShadow={'0 2px 4px rgba(0, 0, 0, 0.2)'} borderRadius={'15px'}>
                <DataTable
                    data={materials}
                    columns={columns}
                    actionButton={true}
                    actionIcon={<EditIcon />}
                    actionProperty={"id"}
                    onActionButtonClick={handleActionClick}
                />
            </Container>
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
                                <FormControl isInvalid={errors.name} mb=".8rem">
                                    <FormLabel>Name</FormLabel>
                                    <Input type='text' name="name" value={values.name} autoFocus={true} onChange={handleChange()} />
                                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                                </FormControl>

                                <HStack>


                                    <FormControl isInvalid={errors.hardness} mb=".8rem">
                                        <FormLabel>Hardness</FormLabel>
                                        <InputGroup>
                                            <Input type='number' name="hardness" textAlign={"right"} value={values.hardness} onChange={handleChange()} />
                                            <InputRightAddon children={"HRC"} />
                                        </InputGroup>
                                        <FormErrorMessage>{errors.hardness}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={errors.density} mb=".8rem">
                                        <FormLabel>Density</FormLabel>
                                        <InputGroup>
                                            <Input type="number" name="density" textAlign={"right"} value={values.density} onChange={handleChange()} />
                                            <InputRightAddon children={"kg/m3"} />
                                        </InputGroup>
                                        <FormErrorMessage>{errors.density}</FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <Center w={"full"}>
                                    <VStack w={"full"}>
                                        <Button w={"full"} type="submit" mt={5} mb={2} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." isDisabled={isSubmitting}>
                                            Save Material
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
                                        buttonText={"Delete Material"}
                                        alertTitle={"Delete Job"}
                                        alertText={"Are you sure you want to delete this material"}
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

import { CloseIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { addDepartment, deleteDepartment, updateDepartment } from "../../../api/endpoints/employee/department"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"
import CustomAlertDialog from "../../utils/AlertDialog"
import CustomModal from "../../utils/CustomModal"

function Department() {
    const { department } = useData()
    const initialState = { name: "" }
    const submit = async (values) => {
        try {
            const response = await addDepartment(values)
            return { title: "Add Operation", message: response.data.message }
        } catch (error) {
            throw error
        }
    }
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(initialState, submit)

    const toast = useToast()

    const [deleting, setDeleting] = useState(false)
    const handleDeleteDepartment = async (id) => {
        try {
            setDeleting(true)
            const response = await deleteDepartment(id)
            toast({
                title: 'Delete Department',
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } catch (error) {
            toast({
                title: 'Delete Department',
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

    const [updating, setUpdating] = useState(false)
    const handleUpdateDepartment = async (id, data) => {
        try {
            setUpdating(true)
            const response = await updateDepartment(data, id)
            toast({
                title: 'Update Department',
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } catch (error) {
            toast({
                title: 'Update Department',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } finally {
            setUpdating(false)
        }
    }

    return (
        <Box px={5}>
            <Flex w={"100%"} gap={10}>
                <Box minW={"30%"} h={'fit-content'} flex={1} pt={5} pb={10} px={5} boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"} borderRadius={'15px'}>
                    <Heading fontWeight={"semibold"} mb={5} size={'md'} color={'gray.700'}>Add Department</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired mt={2} isInvalid={errors.name}>
                            <FormLabel>Department Name</FormLabel>
                            <InputGroup>
                                <Input type="name" name="name" value={values.name} onChange={handleChange()} />
                            </InputGroup>
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={5}>
                            <Button type="submit" w={"100%"} colorScheme="purple" isLoading={isSubmitting} loadingText="Adding..." isDisabled={isSubmitting}> Add Department </Button>
                        </FormControl>
                    </form>
                </Box>
                <Box flex={3}>
                    <Heading fontWeight={"semibold"} m={3} color={"gray.700"} size={"md"}>All Departments</Heading>
                    <Flex wrap={"wrap"}>
                        {
                            department && department.map((d, index) => (

                                <Box
                                    key={`${d.name}-${index}`}
                                    px={6}
                                    py={4}
                                    my={3}
                                    mx={3}
                                    borderRadius={4}
                                    boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
                                    w={'fit-content'}
                                >
                                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                                        <Text mr={10}>
                                            {d.name}
                                        </Text>
                                        <ButtonGroup>
                                            <CustomModal
                                                trigger={(onOpen) => (
                                                    <IconButton onClick={onOpen} isRound={true} size={"sm"} aria-label='Search database' icon={<EditIcon />} />
                                                )}
                                                size={"md"}
                                                hideFooterClose={true}
                                                header={"Edit Department"}
                                            >
                                                <form onSubmit={handleSubmit}>
                                                    <FormControl isRequired mt={2} isInvalid={errors.name}>
                                                        <FormLabel>Department Name</FormLabel>
                                                        <InputGroup>
                                                            <Input type="name" name="name" value={values.name} onChange={handleChange()} />
                                                        </InputGroup>
                                                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl my={5}>
                                                        <Button type="submit" w={"100%"} colorScheme="purple" isLoading={isSubmitting} loadingText="Adding..." isDisabled={isSubmitting}> Update Department </Button>
                                                    </FormControl>
                                                </form>
                                            </CustomModal>

                                            <CustomAlertDialog
                                                button={
                                                    (onOpen) => (
                                                        <IconButton onClick={onOpen} isRound={true} size={"sm"} aria-label='close button' icon={<CloseIcon />} />
                                                    )
                                                }
                                                alertTitle={"Delete Department"}
                                                alertText={"Are you sure you want to delete this department?"}
                                                confirmButtonText={"Delete"}
                                                confirmButtonStatus={deleting}
                                                confirmMethod={async (onClose) => {
                                                    await handleDeleteDepartment(d.value);
                                                    onClose();
                                                }}
                                            />
                                        </ButtonGroup>
                                    </Flex>
                                </Box>

                            ))
                        }
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default Department;
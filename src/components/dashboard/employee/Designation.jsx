import { CloseIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, Text, useToast } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useState } from "react"
import { addDesignation, deleteDesignation, updateDesignation } from "../../../api/endpoints/employee/designation"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"
import CustomAlertDialog from "../../utils/AlertDialog"
import CustomModal from "../../utils/CustomModal"

function Designation() {
    const { designationByDepartment, department } = useData()
    const initialState = { name: "", departmentId: '' }
    const submit = async (values) => {
        try {
            const response = await addDesignation(values)
            return { title: "Add Designation", message: response.data.message }
        } catch (error) {
            throw error
        }
    }
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(initialState, submit)

    const toast = useToast()

    const [deleting, setDeleting] = useState(false)
    const handleDeleteDesignation = async (id) => {
        try {
            setDeleting(true)
            const response = await deleteDesignation(id)
            toast({
                title: 'Delete Designation',
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } catch (error) {
            toast({
                title: 'Delete Designation',
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
    const handleUpdateDesignation = async (id, data) => {
        try {
            setUpdating(true)
            const response = await updateDesignation(data, id)
            toast({
                title: 'Update Designation',
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } catch (error) {
            toast({
                title: 'Update Designation',
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
        <Box>
            <Flex w={"100%"} gap={5}>
                <Box minW={"30%"} h={'fit-content'} flex={1} pt={5} pb={10} px={5} boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"} borderRadius={'15px'}>
                    <Heading fontWeight={"semibold"} mb={5} size={'md'} color={'gray.700'}>Add Designations</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired mt={2} isInvalid={errors.departmentId}>
                            <FormLabel> Department</FormLabel>
                            <Select
                                onChange={handleChange("departmentId")}
                                options={department}
                                values={department.filter(e => e.value === values.departmentId)[0]}
                            />
                            <FormErrorMessage>{errors.departmentId}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired mt={4} isInvalid={errors.name}>
                            <FormLabel>Designation Name</FormLabel>
                            <InputGroup>
                                <Input type="text" name="name" value={values.name} onChange={handleChange()} />
                            </InputGroup>
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={5}>
                            <Button type="submit" w={"100%"} colorScheme="purple" isLoading={isSubmitting} loadingText="Adding..." isDisabled={isSubmitting}> Add Designation </Button>
                        </FormControl>
                    </form>
                </Box>
                <Box flex={3}>
                    <Heading fontWeight={"semibold"} m={3} color={"gray.700"} size={"md"}>All Designations</Heading>
                    <Box mx={3} >
                        {
                            designationByDepartment && designationByDepartment.map((d, index) => (
                                <Box key={`${d.department}-${index}`}>
                                    <Box>
                                        <Text color={"gray.600"} fontWeight={"500"}>{d.department}</Text>
                                    </Box>
                                    <Flex wrap={"wrap"} w={"100%"}>

                                        {
                                            d.designations.length > 0 ? d.designations.map((designation, index) => (
                                                <Box
                                                    key={`${designation.name}-${index}`}
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
                                                            {designation.name}
                                                        </Text>
                                                        <ButtonGroup>
                                                            <CustomModal
                                                                trigger={(onOpen) => (
                                                                    <IconButton onClick={onOpen} isRound={true} size={"sm"} aria-label='Close Button' icon={<EditIcon />} />
                                                                )}
                                                                size={"md"}
                                                                hideFooterClose={true}
                                                                header={"Edit Designation"}
                                                            >
                                                                <form onSubmit={handleSubmit}>
                                                                    <FormControl isRequired mt={2} isInvalid={errors.name}>
                                                                        <FormLabel>Designation Name</FormLabel>
                                                                        <InputGroup>
                                                                            <Input type="name" name="name" value={values.name} onChange={handleChange()} />
                                                                        </InputGroup>
                                                                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                                                                    </FormControl>
                                                                    <FormControl my={5}>
                                                                        <Button type="submit" w={"100%"} colorScheme="purple" isLoading={isSubmitting} loadingText="Adding..." isDisabled={isSubmitting}> Update Designation </Button>
                                                                    </FormControl>
                                                                </form>
                                                            </CustomModal>

                                                            <CustomAlertDialog
                                                                button={
                                                                    (onOpen) => (
                                                                        <IconButton onClick={onOpen} isRound={true} size={"sm"} aria-label='close button' icon={<CloseIcon />} />
                                                                    )
                                                                }
                                                                alertTitle={"Delete Designation"}
                                                                alertText={"Are you sure you want to delete this designation?"}
                                                                confirmButtonText={"Delete"}
                                                                confirmButtonStatus={deleting}
                                                                confirmMethod={async (onClose) => {
                                                                    await handleDeleteDesignation(designation.id);
                                                                    onClose();
                                                                }}
                                                            />
                                                        </ButtonGroup>
                                                    </Flex>
                                                </Box>
                                            )) : <Text px={6}> No Designations in {d.department}</Text>
                                        }
                                    </Flex>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default Designation;
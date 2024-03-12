import { CloseIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, Text } from "@chakra-ui/react"
import { createExpenseCategory } from "../../../api/data"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"
import CustomAlertDialog from "../../utils/AlertDialog"
import CustomModal from "../../utils/CustomModal"

function ExpenseCategoryPage() {
    const { expenseCategories } = useData()
    const initialState = { name: "" }
    const submit = async (values) => {
        try {
            const response = await createExpenseCategory(values)
            return { title: "Add Scrap Sell", message: response.data.message }
        } catch (error) {
            throw error
        }
    }
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(initialState, submit)

    return (
        <Box p={5}>
            <Flex w={"100%"} gap={10}>
                <Box h={'fit-content'} flex={1} pt={5} pb={10} px={5} boxShadow={'0 2px 4px rgba(0, 0, 0, 0.2)'} borderRadius={'15px'}>
                    <Heading mb={5} size={'md'} color={'gray.700'}>Create New Expense Category</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired mt={2} isInvalid={errors.name}>
                            <FormLabel>Category Name</FormLabel>
                            <InputGroup>
                                <Input type="name" name="name" value={values.name} onChange={handleChange()} />
                            </InputGroup>
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={5}>
                            <Button type="submit" w={"100%"} colorScheme="purple" isLoading={isSubmitting} loadingText="Adding..." isDisabled={isSubmitting}>Create Expense Category </Button>
                        </FormControl>
                    </form>
                </Box>
                <Box flex={3}>
                    <Heading color={"gray.700"} size={"md"}>All Expense Categories</Heading>
                    <Flex wrap={"wrap"}>
                        {
                            expenseCategories && expenseCategories.map((expenseCategory, index) => (

                                <Box
                                    key={`${expenseCategories.name}-${index}`}
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
                                            {expenseCategory.name}
                                        </Text>
                                        <ButtonGroup>
                                            <CustomModal
                                                trigger={(onOpen) => (
                                                    <IconButton onClick={onOpen} isRound={true} size={"sm"} aria-label='Search database' icon={<EditIcon />} />
                                                )}
                                                size={"md"}
                                                hideFooterClose={true}
                                                header={"Edit Expense Category"}
                                            >
                                                <form onSubmit={handleSubmit}>
                                                    <FormControl isRequired mt={2} isInvalid={errors.name}>
                                                        <FormLabel>Category Name</FormLabel>
                                                        <InputGroup>
                                                            <Input type="name" name="name" value={values.name} onChange={handleChange()} />
                                                        </InputGroup>
                                                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl my={5}>
                                                        <Button type="submit" w={"100%"} colorScheme="purple" isLoading={isSubmitting} loadingText="Adding..." isDisabled={isSubmitting}>Create Expense Category </Button>
                                                    </FormControl>
                                                </form>
                                            </CustomModal>

                                            <CustomAlertDialog
                                                button={
                                                    (onOpen) => (
                                                        <IconButton onClick={onOpen} isRound={true} size={"sm"} aria-label='Search database' icon={<CloseIcon />} />
                                                    )
                                                }
                                                alertTitle={"Delete Expense Category"}
                                                alertText={"Are you sure you want to delete this expense category?"}
                                                confirmButtonText={"Delete"}
                                                confirmButtonStatus={false}
                                                confirmMethod={(onClose) => {
                                                    onClose()
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

export default ExpenseCategoryPage
import { AddIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl, FormErrorMessage, FormLabel, HStack,
    Icon, Input, InputGroup, InputRightAddon,
    Textarea
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useData } from "../../../hooks/useData";
import { useFormValidation } from "../../../hooks/useFormValidation";
import CustomModal from "../../utils/CustomModal";
function AddNewExpense() {
    const { expenseCategories } = useData()
    const initialState = {
        expenseCategoryId: '', date: '', amount: '', description: ''
    }
    const submit = async (values) => {
        try {
            console.log(values)
            return { message, title: Response.data.message }
        } catch (error) {
            throw error
        }
    }
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(initialState, submit,)
    return (
        <CustomModal
            trigger={(onOpen) => (
                <Button colorScheme="purple" leftIcon={<Icon as={AddIcon} />} onClick={onOpen}> New Expense</Button>
            )}
            size={"md"}
            hideFooterClose={true}
            header={"New Expense"}
        >
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={errors.expenseCategoryId} isRequired>
                    <FormLabel>Select Category</FormLabel>
                    <Select
                        options={expenseCategories || []}
                        tagVariant={'solid'}
                        colorScheme="purple"
                        onChange={handleChange('expenseCategoryId')}
                        value={expenseCategories.filter(v => v.id === values.expenseCategoryId)[0]}
                    />
                    <FormErrorMessage> some error</FormErrorMessage>
                </FormControl>
                <HStack mt={2}>
                    <FormControl isInvalid={errors.date} isRequired>
                        <FormLabel>Date</FormLabel>
                        <Input type="date" name="date" value={values.date} onChange={handleChange()} />
                        <FormErrorMessage> {errors.date}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.amount} isRequired>
                        <FormLabel>Amount</FormLabel>
                        <InputGroup>
                            <Input type="number" name="amount" value={values.amount} onChange={handleChange()} />
                            <InputRightAddon children={"Rs"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.amount}</FormErrorMessage>
                    </FormControl>
                </HStack>
                <FormControl isInvalid={errors.description} mt={2} >
                    <FormLabel>Description</FormLabel>
                    <Textarea name="description" value={values.description} onChange={handleChange()} />
                    <FormErrorMessage> {errors.description} </FormErrorMessage>
                </FormControl>
                <Button my={5} w="full" type="submit" colorScheme="purple" loadingText="Adding Expense" isLoading={isSubmitting} isDisabled={isSubmitting}>Add Expense</Button>
            </form>
        </CustomModal>
    )
}

export default AddNewExpense
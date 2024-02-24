import { Button, Center, Container, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react"
import { addMaterial } from "../../../api/data"
import { useFormValidation } from "../../../hooks/useFormValidation"
function AddEmployee() {
    const initialState = { name: '', hardness: '', density: '' }

    const saveMaterial = async (values) => {
        try {
            console.log(values)
            const { data: { message } } = await addMaterial(values)
            return { title: "Save Material", message }
        } catch (error) {
            throw error
        }
    }

    const { values, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, saveMaterial)

    return (
        <Container p={5} boxShadow={'0 2px 4px rgba(0, 0, 0, 0.2)'} borderRadius={'15px'}>
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>First Name</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Last Name</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Email</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Mobile Number</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Address</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Department</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Designation</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Salary</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired mb=".8rem">
                    <FormLabel>Date Of Joining</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <Center w={"full"}>
                    <VStack w={"full"}>
                        <Button type="submit" w={"full"} mt={5} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." isDisabled={isSubmitting}>
                            Save Material
                        </Button>
                    </VStack>
                </Center>
            </form>
        </Container>
    )
}

export default AddEmployee
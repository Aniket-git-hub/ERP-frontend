import { Button, Center, Container, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightAddon, VStack } from "@chakra-ui/react"
import { addMaterial } from "../../../api/data"
import { useFormValidation } from "../../../hooks/useFormValidation"
function AddAttendance() {
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
                    <FormLabel>Employee</FormLabel>
                    <Input type='text' name="name" value={values.name} onChange={handleChange()} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <HStack>
                    <FormControl isInvalid={errors.hardness} isRequired mb=".8rem">
                        <FormLabel>Hardness</FormLabel>
                        <InputGroup>
                            <Input type='number' name="hardness" textAlign={"right"} value={values.hardness} onChange={handleChange()} />
                            <InputRightAddon children={"HRC"} />
                        </InputGroup>
                        <FormErrorMessage>{errors.hardness}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.density} isRequired mb=".8rem">
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
                        <Button type="submit" w={"full"} mt={5} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." isDisabled={isSubmitting}>
                            Save Material
                        </Button>
                    </VStack>
                </Center>
            </form>
        </Container>
    )
}

export default AddAttendance
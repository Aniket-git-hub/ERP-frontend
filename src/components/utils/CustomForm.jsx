import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightAddon, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useFormValidation } from "../../hooks/useFormValidation"

function CustomForm({ fields, submitButtonText, loadingText, initialState }) {
    const submit = async (values) => {
        try {
            console.log(values)
            return { title: 'some thing ', message: "nothing" }
        } catch (error) {
            throw error
        }
    }
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(initialState, submit)
    return (
        <Box w={"100%"} p={2}>
            <form onSubmit={handleSubmit}>
                {
                    fields && fields.map((group, index) => (
                        group.inputs && group.horizontal == true ?

                            <HStack key={`H-${index}`}>
                                {
                                    group.inputs.map((field, index) => (
                                        <FormControl key={`H-${index}-H`} mt={2} isRequired={field.required} isInvalid={errors[field.name]} >
                                            <FormLabel>{field.label}</FormLabel>
                                            {
                                                field.type === 'select' ?
                                                    <>
                                                        <Select
                                                            onChange={handleChange(field.name)}
                                                            value={field.options.filter(v => v.value === values[field.name])[0]}
                                                            options={field.options || []}
                                                            tagVariant={'solid'}
                                                            colorScheme="purple"
                                                        />
                                                    </> :
                                                    field.type === 'textarea' ?
                                                        <>
                                                            <Textarea
                                                                name={field.name}
                                                                value={values[field.name]}
                                                                handleChange={handleChange()}
                                                            />
                                                        </>
                                                        : <>
                                                            <InputGroup>
                                                                <Input
                                                                    name={field.name}
                                                                    value={values[field.name]}
                                                                    handleChange={handleChange()}
                                                                    textAlign={field.textRight ? "right" : "left"}
                                                                />
                                                                {field.rightAddOn && <InputRightAddon children={field.rightAddOn} />}
                                                            </InputGroup>
                                                        </>
                                            }
                                            <FormErrorMessage> {errors[field.name]} </FormErrorMessage>
                                        </FormControl>
                                    ))
                                }
                            </HStack>

                            : group.inputs.map((field, index) => (
                                <FormControl key={`V-${index}`} mt={2} isRequired={field.required} isInvalid={errors[field.name]} >
                                    <FormLabel>{field.label}</FormLabel>
                                    {
                                        field.type === 'select' ?
                                            <>
                                                <Select
                                                    onChange={handleChange(field.name)}
                                                    value={field.options.filter(v => v.value === values[field.name])[0]}
                                                    options={field.options || []}
                                                />
                                            </> :
                                            field.type === 'textarea' ?
                                                <>
                                                    <Textarea name={field.name} value={values[field.name]}
                                                        handleChange={handleChange()} />
                                                </>
                                                : <>
                                                    <InputGroup>
                                                        <Input
                                                            name={field.name}
                                                            value={values[field.name]}
                                                            handleChange={handleChange}
                                                            textAlign={field.textRight ? "right" : "left"}

                                                        />
                                                        {field.rightAddOn && <InputRightAddon children={field.rightAddOn} />}
                                                    </InputGroup>
                                                </>
                                    }
                                    <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
                                </FormControl>
                            ))
                    ))
                }
                <Button w={"100%"} mt={5} type="submit" colorScheme="purple" isDisabled={isSubmitting} isLoading={isSubmitting} loadingText={loadingText}>{submitButtonText}</Button>
            </form>
        </Box>
    )
}

export default CustomForm
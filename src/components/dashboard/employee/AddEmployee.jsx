import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputRightAddon,
    Textarea
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { addEmployee } from "../../../api/endpoints/employee/employees"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"

function AddEmployee() {
    const { department, designation } = useData()

    const initialState = { firstName: '', lastName: '', email: '', mobileNumber: '', address: '', departmentId: 0, designationId: 0, salary: '', dateOfJoining: '' }
    const submit = async (values) => {
        console.log(values)
        try {
            const response = await addEmployee(values)
            return { title: 'Add Employee', message: response.data.message }
        } catch (error) {
            throw error
        }
    }
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(initialState, submit)


    return (
        <Container p={5} boxShadow={'0 2px 4px rgba(0, 0, 0, 0.2)'} borderRadius={'8px'}>
            <Box flex={2} w={'100%'} mH={"100%"}>
                <form onSubmit={handleSubmit} style={{ height: "100%" }} >
                    <Heading color={"gray.700"} mb={5} size={"md"} >Add Employee</Heading>
                    <HStack my={2}>
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
                    </HStack>

                    <HStack my={2}>
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
                    </HStack>

                    <FormControl isInvalid={errors.address} isRequired>
                        <FormLabel>Address</FormLabel>
                        <Textarea name="address" value={values.address} onChange={handleChange()} ></Textarea>
                        <FormErrorMessage>
                            {errors.address}
                        </FormErrorMessage>
                    </FormControl>

                    <HStack my={2}>
                        <FormControl isInvalid={errors.departmentId} isRequired>
                            <FormLabel>Department</FormLabel>
                            <Select
                                options={department}
                                onChange={handleChange("departmentId")}
                                value={department.filter(e => e.value === values.departmentId)[0] || ''}
                            />
                            <FormErrorMessage>
                                {errors.departmentId}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.designationId} isRequired>
                            <FormLabel>Designation</FormLabel>
                            <Select
                                options={designation}
                                onChange={handleChange("designationId")}
                                value={designation.filter(e => e.value === values.designationId)[0] || ''}
                            />
                            <FormErrorMessage>
                                {errors.designationId}
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>

                    <HStack my={2}>
                        <FormControl isInvalid={errors.salary} isRequired>
                            <FormLabel>Salary</FormLabel>
                            <InputGroup>
                                <Input type="number" name="salary" textAlign={"right"} value={values.salary} onChange={handleChange()} />
                                <InputRightAddon children={"/8 hrs (in Rs)"} />
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.salary}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.dateOfJoining} isRequired>
                            <FormLabel>Date Of Joining</FormLabel>
                            <Input type="date" name="dateOfJoining" value={values.dateOfJoining} onChange={handleChange()} />
                            <FormErrorMessage>
                                {errors.dateOfJoining}
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>

                    <FormControl w={"100%"} mt={5} mb={2}>
                        <Button w={"100%"} colorScheme="purple" type="submit" isDisabled={isSubmitting} isLoading={isSubmitting} loadingText="Adding..." >Add Employee</Button>
                    </FormControl>
                </form>
            </Box>
        </Container >
    )
}

export default AddEmployee

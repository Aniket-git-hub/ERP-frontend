import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Textarea,
    useSteps
} from "@chakra-ui/react"
import { addEmployee } from "../../../api/data"
import { useFormValidation } from "../../../hooks/useFormValidation"

function AddEmployee() {
    const steps = [
        { title: 'First', description: 'Personal Info' },
        { title: 'Second', description: 'Employment Info' },
    ]

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    })

    const initialState = { firstName: '', lastName: '', email: '', mobileNumber: '', address: '', department: '', designation: '', salary: '', dateOfJoining: '' }
    const submit = async (values) => {
        console.log(values)
        try {
            const response = await addEmployee(values)

            goToNext()
            return { title: 'AddEmployee', message: response.data.message }
        } catch (error) {
            throw error
        }
    }
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(initialState, submit)


    return (
        <Container p={5} boxShadow={'0 2px 4px rgba(0, 0, 0, 0.2)'} borderRadius={'15px'}>
            <Flex gap={10}>
                <Stepper flex={1} size='lg' index={activeStep} orientation="vertical" minH={"500px"}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <Box flex={2} w={'100%'} mH={"100%"}>
                    <form onSubmit={handleSubmit} style={{ height: "100%" }} >


                        {
                            activeStep === 0 ?
                                <Flex minH={"100%"} direction={"column"} justify={"space-between"} w={"100%"}>
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

                                    <FormControl isInvalid={errors.address} isRequired>
                                        <FormLabel>Address</FormLabel>
                                        <Textarea name="address" value={values.address} onChange={handleChange()} ></Textarea>
                                        <FormErrorMessage>
                                            {errors.address}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <Flex w={"100%"} mt={10} justifyContent={"end"}>
                                        <Button colorScheme="purple" onClick={goToNext} isDisabled={errors.firstName || errors.lastName || errors.mobileNumber || errors.email || errors.address} >Next</Button>
                                    </Flex>
                                </Flex>
                                :
                                <Flex minH={"100%"} direction={"column"} justify={"space-between"} w={"100%"} >
                                    <Box>
                                        <FormControl isInvalid={errors.department} isRequired>
                                            <FormLabel>Department</FormLabel>
                                            <Input type="text" name="department" value={values.department} onChange={handleChange()} />
                                            <FormErrorMessage>
                                                {errors.department}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={errors.designation} isRequired>
                                            <FormLabel>Designation</FormLabel>
                                            <Input type="text" name="designation" value={values.designation} onChange={handleChange()} />
                                            <FormErrorMessage>
                                                {errors.designation}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={errors.salary} isRequired>
                                            <FormLabel>Salary</FormLabel>
                                            <Input type="text" name="salary" value={values.salary} onChange={handleChange()} />
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
                                    </Box>
                                    <Flex w={"100%"} mt={10} justifyContent={"space-between"}>
                                        <Button colorScheme="purple" variant={'outline'} onClick={goToPrevious} >Back</Button>
                                        <Button colorScheme="purple" type="submit" >Submit</Button>
                                    </Flex>
                                </Flex>
                        }
                    </form>
                </Box>
            </Flex>
        </Container >
    )
}

export default AddEmployee

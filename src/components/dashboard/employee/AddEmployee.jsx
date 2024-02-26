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

function AddEmployee() {
    const steps = [
        { title: 'First', description: 'Personal Info' },
        { title: 'Second', description: 'Employment Info' },
    ]

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    })

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
                {
                    activeStep === 0 ?
                        <Flex flex={2} minH={"100%"} direction={"column"} justify={"space-between"} w={"100%"}>
                            <form>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Textarea ></Textarea>
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                            </form>
                            <Flex w={"100%"} mt={10} justifyContent={"end"}>
                                <Button colorScheme="purple" onClick={goToNext} >Next</Button>
                            </Flex>
                        </Flex>
                        :
                        <Flex flex={2} minH={"100%"} direction={"column"} justify={"space-between"} w={"100%"} >
                            <Box>
                                <FormControl>
                                    <FormLabel>Department</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Designation</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Salary</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Date Of Joining</FormLabel>
                                    <Input />
                                    <FormErrorMessage>
                                        Hi
                                    </FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Flex w={"100%"} mt={10} justifyContent={"space-between"}>
                                <Button colorScheme="purple" variant={'outline'} onClick={goToPrevious} >Back</Button>
                                <Button colorScheme="purple"   >Submit</Button>
                            </Flex>
                        </Flex>
                }
            </Flex>
        </Container>
    )
}

export default AddEmployee

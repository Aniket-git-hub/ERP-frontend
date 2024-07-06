import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, Center, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Input, InputGroup, InputRightElement, Link, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';

export default function LoginPage() {
    const initialState = { email: 'singhdharmvir81@gmail.com', password: 'Test@123' }

    const { save } = useAuth()

    const login = async (values) => {
        try {
            console.log(values)
            const response = await loginUser(values)
            const { user, token } = response.data
            save(user, token)
            return { message: `Welcome back ${user.firstName && user.firstName}`, title: `Login Successful` }
        } catch (error) {
            throw error
        }
    }

    const { values, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, login)

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Container as="section" my="50px" maxW="400px">
            <Card borderBottom="4px" borderBottomColor="purple.500">
                <CardBody>
                    <Center>
                        <Heading mb="30px">LETSBUG ERP - Login </Heading>
                    </Center>
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={errors.email} isRequired mb=".8rem">
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name="email" value={values.email} onChange={handleChange()} />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="password" isInvalid={errors.password} isRequired mb=".8rem">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? "text" : "password"} name="password" value={values.password} onChange={handleChange()} />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Icon as={ViewOffIcon} /> : <Icon as={ViewIcon} />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Flex justifyContent="end">
                            <Link href="/forgot-password">Forgot password</Link>
                        </Flex>
                        <Center>
                            <VStack>
                                <Button type="submit" m={5} colorScheme='purple' isLoading={isSubmitting} loadingText="logging..." disabled={isSubmitting}>
                                    Login
                                </Button>
                                <p>Don't have an account? <Link href="/register">Create</Link> </p>
                            </VStack>
                        </Center>
                    </form>
                </CardBody>

            </Card>
        </Container>
    )
}

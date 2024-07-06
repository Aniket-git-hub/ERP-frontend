import { Button, Card, CardBody, Center, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';

export default function ForgotPassword() {
    const initialState = { email: 'singhdharmvir81@gmail.com' }

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
                        <Heading mb="30px">LETSBUG ERP - Forgot Password </Heading>
                    </Center>
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={errors.email} isRequired mb=".8rem">
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name="email" value={values.email} onChange={handleChange()} />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <Center>
                            <Button type="submit" m={5} colorScheme='purple' isLoading={isSubmitting} loadingText="logging..." disabled={isSubmitting}>
                                Send OTP
                            </Button>
                        </Center>
                    </form>
                </CardBody>

            </Card>
        </Container>
    )
}

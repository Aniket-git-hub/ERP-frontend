import {
    Button,
    Card,
    CardBody,
    Center,
    Container,
    Flex,
    Heading,
    Link,
    VStack
} from "@chakra-ui/react"
import { loginUser } from "../../api/auth"
import FormInput from "../../components/utils/form/FormInput"
import { useAuth } from "../../hooks/useAuth"
import { useFormValidation } from "../../hooks/useFormValidation"

export default function LoginPage() {
    const initialState = {
        email: "singhdharmvir81@gmail.com",
        password: "Test@1234",
    }

    const { save } = useAuth()

    const login = async (values) => {
        try {
            const response = await loginUser(values)
            const { user, token } = response.data
            save(user, token)
            return {
                message: `Welcome back ${user.firstName && user.firstName}`,
                title: `Login Successful`,
            }
        } catch (error) {
            throw error
        }
    }

    const { values, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, login)

    return (
        <Container as="section" my="50px" maxW="400px">
            <Card borderBottom="4px" borderBottomColor="purple.500">
                <CardBody>
                    <Center>
                        <Heading mb="30px">LETSBUG ERP - Login </Heading>
                    </Center>
                    <form onSubmit={handleSubmit}>

                        <FormInput
                            type="email"
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange()}
                            error={errors.email}
                            isRequired
                        />
                        <FormInput
                            type="password"
                            name="password"
                            label="Password"
                            value={values.password}
                            onChange={handleChange()}
                            error={errors.password}
                            isRequired
                            showPasswordToggle
                        />

                        <Flex justifyContent="end">
                            <Link href="/forgot-password">Forgot password</Link>
                        </Flex>
                        <Center>
                            <VStack>
                                <Button
                                    type="submit"
                                    m={5}
                                    colorScheme="purple"
                                    isLoading={isSubmitting}
                                    loadingText="logging..."
                                    disabled={isSubmitting}
                                >
                                    Login
                                </Button>
                                <p>
                                    Don't have an account? <Link href="/register">Create</Link>{" "}
                                </p>
                            </VStack>
                        </Center>
                    </form>
                </CardBody>
            </Card>
        </Container>
    )
}

import {
    Button,
    Card,
    CardBody,
    Center,
    Container,
    Heading,
    HStack,
    Link,
    VStack,
} from "@chakra-ui/react"
import { registerUser } from "../../api/auth"
import FormInput from "../../components/utils/form/FormInput"
import { useAuth } from "../../hooks/useAuth"
import { useFormValidation } from "../../hooks/useFormValidation"

export default function RegisterPage() {
    const { save } = useAuth()

    const login = async (values) => {
        try {
            console.log(values)
            const response = await registerUser(values)
            const { user, token } = response.data
            save(user, token)
            return {
                message: `Welcome back ${user.firstName && user.firstName}`,
                title: `Registration Successful`,
            }
        } catch (error) {
            throw error
        }
    }

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
    }
    const { values, errors, handleChange, handleSubmit, isSubmitting } =
        useFormValidation(initialState, login)

    return (
        <Container as="section" my="50px" maxW="600px">
            <Card borderBottom="4px" borderBottomColor="purple.500">
                <CardBody>
                    <Center>
                        <Heading mb="30px">LETSBUG ERP - Register </Heading>
                    </Center>
                    <form onSubmit={handleSubmit}>
                        <HStack>
                            <FormInput
                                name="firstName"
                                label="First Name"
                                value={values.firstName}
                                onChange={handleChange()}
                                error={errors.firstName}
                                isRequired
                            />
                            <FormInput
                                name="lastName"
                                label="Last Name"
                                value={values.lastName}
                                onChange={handleChange()}
                                error={errors.lastName}
                                isRequired
                            />
                        </HStack>
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
                            type="number"
                            name="mobileNumber"
                            label="Mobile Number"
                            value={values.number}
                            onChange={handleChange()}
                            error={errors.number}
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
                                    Register
                                </Button>
                                <p>
                                    Already registered? <Link href="/login">Login</Link>
                                </p>
                            </VStack>
                        </Center>
                    </form>
                </CardBody>
            </Card>
        </Container>
    )
}

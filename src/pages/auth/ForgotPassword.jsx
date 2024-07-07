import {
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Heading
} from "@chakra-ui/react"
import FormInput from "../../components/utils/form/FormInput"
import { useFormValidation } from "../../hooks/useFormValidation"

export default function ForgotPassword() {

  const initialState = { email: "singhdharmvir81@gmail.com" }
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, (values) => {
    console.log(values)
    return { title: "", message: "" }
  })


  return (
    <Container as="section" my="50px" maxW="500px">
      <Card borderBottom="4px" borderBottomColor="purple.500">
        <CardBody>
          <Center>
            <Heading mb="30px">LETSBUG ERP - Forgot Password </Heading>
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
            <Center>
              <Button
                type="submit"
                m={5}
                colorScheme="purple"
                isLoading={isSubmitting}
                loadingText="logging..."
                disabled={isSubmitting}
              >
                Send OTP
              </Button>
            </Center>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}

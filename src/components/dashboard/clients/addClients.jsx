import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useRef } from "react"
import { addClient } from "../../../api/endpoints/work/clients"
import { useFormValidation } from "../../../hooks/useFormValidation"
function AddClient() {
  const clientNameRef = useRef()

  const initialState = { name: "", email: "", phone: "", address: "", gst: "" }

  const saveClient = async (values) => {
    try {
      console.log(values)
      const {
        data: { message },
      } = await addClient(values)
      return { title: "Save Client", message }
    } catch (error) {
      throw error
    } finally {
      clientNameRef.current.focus()
    }
  }

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormValidation(initialState, saveClient)

  return (
    <Container>
      <Box
        boxShadow={"0px 3px 15px rgba(0,0,0,0.2)"}
        py={5}
        px={8}
        rounded={"lg"}
      >
        <Heading size={"md"} mb={3} color={"gray.700"}>
          Add Client
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={errors.name} isRequired mb=".8rem">
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange()}
              ref={clientNameRef}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email} isRequired mb=".8rem">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange()}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.phone} isRequired mb=".8rem">
            <FormLabel>Phone</FormLabel>
            <Input
              type="number"
              name="phone"
              value={values.phone}
              onChange={handleChange()}
            />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.address} isRequired mb=".8rem">
            <FormLabel>Address</FormLabel>
            <Textarea
              name="address"
              value={values.address}
              onChange={handleChange()}
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.gst} isRequired mb=".8rem">
            <FormLabel>GST</FormLabel>
            <Input
              type="text"
              name="gst"
              value={values.gst.toUpperCase()}
              onChange={handleChange()}
            />
            <FormErrorMessage>{errors.gst}</FormErrorMessage>
          </FormControl>
          <Center w={"100%"}>
            <VStack w={"100%"}>
              <Button
                w={"100%"}
                type="submit"
                my={2}
                colorScheme="purple"
                isLoading={isSubmitting}
                loadingText="Saving..."
                isDisabled={isSubmitting}
              >
                Save Client
              </Button>
            </VStack>
          </Center>
        </form>
      </Box>
    </Container>
  )
}

export default AddClient

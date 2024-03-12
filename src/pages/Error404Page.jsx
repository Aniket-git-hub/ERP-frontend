import { Box, Button, Container, Heading, Img, Link, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import image from "../assets/404.svg"

function Error404Page() {
    const navigate = useNavigate()
    return (
        <Container textAlign={"center"}>
            <Box>
                <Img src={image} />
                <Heading>Error 404</Heading>
                <Text>Let's go back</Text>
                <Button mt={2} colorScheme="purple" onClick={() => navigate(-1)}>Home</Button>
            </Box>
            <Link href="https://storyset.com/web" color="gray.200" target="blank">Web illustrations by Storyset</Link>
        </Container>
    )
}

export default Error404Page
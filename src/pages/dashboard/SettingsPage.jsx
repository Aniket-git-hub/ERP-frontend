import { Box, Heading } from "@chakra-ui/react"
import TabsComponent from "../../components/utils/TabsComponent"

function SettingsPage() {
    const tabs = [
        { title: 'General', component: "" },
        { title: 'Account', component: "" },
    ]
    return (
        <Box p={5}>
            <Heading mb={5} size={'md'} color={"gray.700"}> Settings </Heading>
            <TabsComponent orientation="vertical" tabs={tabs} />
        </Box>
    )
}

export default SettingsPage
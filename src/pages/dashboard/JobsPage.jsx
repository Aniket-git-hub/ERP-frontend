import { Box } from "@chakra-ui/react"
import AddJobs from "../../components/dashboard/jobs/addJobs"
import ViewJobs from "../../components/dashboard/jobs/viewJobs"
import TabsComponent from "../../components/utils/TabsComponent"
function JobsPage() {
  const tabs = [
    { title: "Add Jobs", component: <AddJobs /> },
    { title: "View Jobs", component: <ViewJobs /> },
  ]
  return (
    <Box px={4}>
      <TabsComponent tabs={tabs} />
    </Box>
  )
}

export default JobsPage

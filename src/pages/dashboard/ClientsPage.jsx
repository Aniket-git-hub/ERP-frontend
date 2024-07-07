import AddClient from "../../components/dashboard/clients/addClients"
import ViewClients from "../../components/dashboard/clients/viewClients"
import TabsComponent from "../../components/utils/TabsComponent"

function ClientsPage() {
  const tabs = [
    { title: "View Clients", component: <ViewClients /> },
    { title: "Add Client", component: <AddClient /> },
  ]

  return <TabsComponent tabs={tabs} />
}

export default ClientsPage

import { useSearchParams } from "react-router-dom"
import AddMaterials from "../../components/dashboard/materials/addMaterials"
import ViewMaterials from "../../components/dashboard/materials/viewMaterials"
import TabsComponent from "../../components/utils/TabsComponent"
function MaterialsPage() {
  const [searchParams] = useSearchParams()
  const tabs = [
    {
      title: "Add Materials",
      component: <AddMaterials />,
      searchParamName: "addMaterial",
    },
    {
      title: "View Materials",
      component: <ViewMaterials />,
      searchParamName: "view",
    },
  ]
  // console.log(searchParams.get('view'));
  return (
    <TabsComponent tabs={tabs} defaultIndex={searchParams.get("view") && 1} />
  )
}

export default MaterialsPage

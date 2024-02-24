import AddEmployee from "../../components/dashboard/employee/AddEmployee";
import ViewEmployees from "../../components/dashboard/employee/ViewEmployee";
import TabsComponent from "../../components/utils/TabsComponent";

function EmployeePage() {
    const tabs = [
        { title: "View Employees", component: <ViewEmployees /> },
        { title: "Add Employee", component: <AddEmployee /> },
    ];
    return <TabsComponent tabs={tabs} />
}

export default EmployeePage
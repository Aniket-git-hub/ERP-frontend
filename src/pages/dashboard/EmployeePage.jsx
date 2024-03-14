import AddEmployee from "../../components/dashboard/employee/AddEmployee";
import EmployeeOverview from "../../components/dashboard/employee/EmployeeOverview";
import ViewEmployees from "../../components/dashboard/employee/ViewEmployee";
import TabsComponent from "../../components/utils/TabsComponent";

function EmployeePage() {
    const tabs = [
        { title: "Overview", component: <EmployeeOverview /> },
        { title: "Advance", component: <AddEmployee /> },
        { title: "Payment", component: <AddEmployee /> },
        { title: "View Employees", component: <ViewEmployees /> },
        { title: "Add Employee", component: <AddEmployee /> },
    ];
    return <TabsComponent tabs={tabs} />
}

export default EmployeePage
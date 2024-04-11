import AttendanceOverview from "../../components/dashboard/attendance/attendanceOverview";
import AddEmployee from "../../components/dashboard/employee/AddEmployee";
import Advance from "../../components/dashboard/employee/Advance";
import EmployeeOverview from "../../components/dashboard/employee/EmployeeOverview";
import Payment from "../../components/dashboard/employee/Payment";
import ViewEmployees from "../../components/dashboard/employee/ViewEmployee";
import TabsComponent from "../../components/utils/TabsComponent";

function EmployeePage() {
    const tabs = [
        { title: "Overview", component: <EmployeeOverview /> },
        { title: "Attendance", component: <AttendanceOverview /> },
        { title: "Advance", component: <Advance /> },
        { title: "Payment", component: <Payment /> },
        { title: "View Employees", component: <ViewEmployees /> },
        { title: "Add Employee", component: <AddEmployee /> },
    ];
    return <TabsComponent tabs={tabs} />
}

export default EmployeePage
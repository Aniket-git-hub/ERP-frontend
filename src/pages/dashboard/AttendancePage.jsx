import AddAttendance from "../../components/dashboard/attendance/AddAttendance";
import ViewInvoices from "../../components/dashboard/invoices/viewInvoices";
import TabsComponent from "../../components/utils/TabsComponent";

function AttendancePage() {
    const tabs = [
        { title: "View Invoices", component: <ViewInvoices /> },
        { title: "Create Invoices", component: <AddAttendance /> },
    ];
    return <TabsComponent tabs={tabs} />
}

export default AttendancePage
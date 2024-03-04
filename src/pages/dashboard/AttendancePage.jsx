import AttendanceOverview from "../../components/dashboard/attendance/attendanceOverview";
import TabsComponent from "../../components/utils/TabsComponent";

function AttendancePage() {
    const tabs = [
        { title: "Overview", component: <AttendanceOverview /> },
        { title: "View Attendance", component: <AttendanceOverview /> },
    ];
    return <TabsComponent tabs={tabs} />
}

export default AttendancePage